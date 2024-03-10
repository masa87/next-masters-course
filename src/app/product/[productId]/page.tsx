import Image from "next/image";
import { type Metadata } from "next";
import { notFound } from "next/navigation";
import { cookies } from "next/headers";
import { revalidateTag } from "next/cache";
import { Star } from "lucide-react";
import { Suspense } from "react";
import { formatPrice } from "@/app/components/utils";
import { ProductGetItemByIdDocument, ReviewCreateDocument } from "@/gql/graphql";
import RelatedProductsList from "@/app/components/organisms/RelatedProductsList";
import { executeGraphql } from "@/app/api/graphqlApi";
import { addToCart, changeItemQuantity, createCart, getCartById } from "@/app/cart/actions";
import ReviewProductForm from "@/app/components/organisms/ReviewProductForm";
import CustomButton from "@/app/components/atoms/CustomButton";
import ReviewList from "@/app/components/organisms/ReviewList";
import Spinner from "@/app/components/atoms/Spinner";

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
	title: string;
	description: string;
	rating: number;
	author: string;
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
			author: reviewData.author,
			description: reviewData.description,
			email: reviewData.email,
			productId: params.productId,
			rating: Number(reviewData.rating),
			title: reviewData.title,
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
		<>
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
							/>
						)}
					</div>

					<div className="md:col-span-1 lg:col-span-1">
						<h1 className="mb-4 text-3xl font-bold">{product.name}</h1>
						<p className="mb-4 text-gray-600">{product.description}</p>
						<div className="mb-4 flex text-gray-600">
							{Array.from({ length: reviewNumber }, (_, i) => i + 1).map((i, j) => (
								<Star key={j} className="h-5 w-5 fill-current text-yellow-500" />
							))}
							<p className="ml-2 italic">{product.rating?.toFixed()}/5</p>
						</div>
						<p className="mb-4 font-bold text-blue-500">{formatPrice(product.price / 100)}</p>
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
		</>
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
