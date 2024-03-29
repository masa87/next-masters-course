import Image from "next/image";
import { type Metadata } from "next";
import { notFound } from "next/navigation";
import { cookies } from "next/headers";
import { revalidateTag } from "next/cache";
import { Suspense } from "react";
import { formatPrice } from "@/app/components/utils";
import {
	ProductGetItemByIdDocument,
	ProductsGetListByCountItemsDocument,
	ReviewCreateDocument,
} from "@/gql/graphql";
import RelatedProductsList from "@/app/components/organisms/RelatedProductsList";
import { executeGraphql } from "@/app/api/graphqlApi";
import { addToCart, changeItemQuantity, createCart, getCartById } from "@/app/cart/actions";
import ReviewProductForm from "@/app/components/organisms/ReviewProductForm";
import CustomButton from "@/app/components/atoms/CustomButton";
import ReviewList from "@/app/components/organisms/ReviewList";
import Spinner from "@/app/components/atoms/Spinner";

export const generateStaticParams = async () => {
	const { products } = await executeGraphql({
		query: ProductsGetListByCountItemsDocument,
		variables: {
			countItems: 8,
			offset: 0,
		},
	});

	return products.data.map((product) => {
		return {
			productId: product.id,
		};
	});
};

export async function generateMetadata({
	params,
}: {
	params: { productId: string };
}): Promise<Metadata> {
	const { product } = await executeGraphql({
		query: ProductGetItemByIdDocument,
		variables: {
			productId: params.productId,
		},
	});

	return {
		title: product?.name,
		description: product?.description,
	};
}

type formReviewType = {
	headline: string;
	content: string;
	rating: number;
	name: string;
	email: string;
};

export default async function ProductPage({
	params,
}: {
	params: {
		productId: string;
	};
}) {
	const { product } = await executeGraphql({
		query: ProductGetItemByIdDocument,
		variables: {
			productId: params.productId,
		},
	});

	if (!product) {
		throw notFound();
	}

	async function addProductToCartAction() {
		"use server";
		const cart = await getOrCreateCart();

		if (!cart) {
			throw new Error("Failed to create cart");
		}
		cookies().set("cartId", cart.cartFindOrCreate.id);

		const itemFromCart = cart.cartFindOrCreate.items.filter(
			(item) => item.product.id === params.productId,
		);

		if (itemFromCart && itemFromCart.length > 0) {
			await changeItemQuantity(
				cart.cartFindOrCreate.id,
				params.productId,
				Number(itemFromCart[0]?.quantity) + 1,
			);
		} else {
			await addToCart(cart.cartFindOrCreate.id, params.productId);
		}

		revalidateTag("cart");
	}

	async function addReviewFormAction(FormData: FormData) {
		"use server";

		const reviewData = Object.fromEntries(FormData) as unknown as formReviewType;

		const newReview = {
			author: reviewData.name,
			description: reviewData.content,
			email: reviewData.email,
			productId: params.productId,
			rating: Number(reviewData.rating),
			title: reviewData.headline,
		};

		const review = await executeGraphql({
			query: ReviewCreateDocument,
			variables: newReview,
			next: {
				tags: ["reviews"],
			},
		});

		if (!review) {
			throw new Error("Failed to create review");
		}

		revalidateTag("reviews");
	}

	const reviewNumber = Number(product.rating?.toFixed());

	return (
		<Suspense fallback={<Spinner />}>
			<form
				action={addProductToCartAction}
				className="container mx-auto my-8 rounded-md bg-white p-8 shadow-lg lg:min-h-[500px]"
			>
				<div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
					<div className="flex justify-center md:col-span-1 lg:col-span-2">
						{product.images[0] && (
							<Image
								src={product.images[0].url}
								alt={product.name}
								className="max-h-[100vh] w-auto"
								width={300}
								height={700}
								priority
							/>
						)}
					</div>

					<div className="md:col-span-1 lg:col-span-1">
						<h1 className="mb-4 text-3xl font-bold">{product.name}</h1>
						<p className="mb-4 text-gray-600">{product.description}</p>
						<div className="mb-4 flex text-gray-600">
							{Array.from({ length: reviewNumber }, (_, i) => i + 1).map((i, j) => (
								<Image key={j} src={"/icons/star.svg"} alt="x-icon" width={20} height={20} />
							))}
							<p className="ml-2 italic">{product.rating?.toFixed()}/5</p>
						</div>
						<p className="mb-4 font-bold text-blue-600">{formatPrice(product.price / 100)}</p>
						<CustomButton title="Add to cart" dataTestId="add-to-cart-button" />
					</div>
				</div>
			</form>
			<h3 className="mb-5 text-xl font-bold">Related products</h3>
			{product.categories[0] && <RelatedProductsList categorySlug={product.categories[0]?.slug} />}

			<form
				action={addReviewFormAction}
				data-testid="add-review-form"
				className="mt-5 flex w-full flex-col gap-3 rounded-md bg-white p-3 shadow-md"
			>
				<h3 className="text-center text-xl font-semibold">Your review</h3>
				<ReviewProductForm />
				<div className="mx-auto mt-3">
					<CustomButton title="Submit" dataTestId="add-review" />
				</div>
			</form>
			<Suspense fallback={<Spinner />}>
				{product.reviews && <ReviewList reviews={product.reviews} />}
			</Suspense>
		</Suspense>
	);
}
async function getOrCreateCart() {
	const cartId = cookies().get("cartId")?.value;

	if (cartId) {
		return getCartById();
	} else {
		return createCart();
	}
}
