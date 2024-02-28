import Image from "next/image";
import { type Metadata } from "next";
import { notFound } from "next/navigation";
import { formatPrice } from "@/app/components/utils";
import { ProductGetItemByIdDocument } from "@/gql/graphql";
import { executeGraphql } from "@/app/api/graphqlApi";
import RelatedProductsList from "@/app/components/organisms/RelatedProductsList";

export async function generateMetadata({
	params,
}: {
	params: { productId: string };
}): Promise<Metadata> {
	const product = executeGraphql(ProductGetItemByIdDocument, {
		productId: params.productId,
	});

	return {
		title: (await product).product?.name,
		description: (await product).product?.description,
	};
}

export default async function ProductPage({
	params,
}: {
	params: {
		productId: string;
	};
}) {
	const product = await executeGraphql(ProductGetItemByIdDocument, {
		productId: params.productId,
	});

	if (!product.product) {
		throw notFound();
	}

	const productToRender = product.product;

	if (!productToRender.categories[0]) {
		throw notFound();
	}

	return (
		<>
			<div className="container mx-auto my-8 rounded-md bg-white p-8 shadow-lg">
				<div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
					<div className="flex justify-center md:col-span-1 lg:col-span-2">
						{productToRender.images[0] && (
							<Image
								src={productToRender.images[0].url}
								alt={productToRender.name}
								className="max-h-[100vh] w-auto"
								width={300}
								height={700}
							/>
						)}
					</div>

					<div className="md:col-span-1 lg:col-span-1">
						<h1 className="mb-4 text-3xl font-bold">{productToRender.name}</h1>
						<p className="mb-4 text-gray-600">{productToRender.description}</p>
						<p className="mb-4 font-bold text-blue-500">
							{formatPrice(productToRender.price / 100)}
						</p>
						{/* <button className="rounded-md bg-blue-500 px-4 py-2 text-white transition hover:bg-blue-600">
						Add to Cart
					</button> */}
					</div>
				</div>
			</div>
			<h3 className="mb-5 text-xl font-bold">Related products</h3>

			{product.product.categories[0] && (
				<RelatedProductsList categorySlug={product.product.categories[0]?.slug} />
			)}
		</>
	);
}
