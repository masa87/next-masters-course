import Image from "next/image";
import { type Metadata } from "next";
import { getProductById } from "@/app/api/getAllProducts";
import { formatPrice } from "@/app/components/utils";

export async function generateMetadata({
	params,
}: {
	params: { productId: string };
}): Promise<Metadata> {
	const product = getProductById(params.productId);

	return {
		title: (await product).name,
		description: (await product).description,
	};
}

export default async function ProductPage({
	params,
}: {
	params: {
		productId: string;
	};
}) {
	const product = await getProductById(params.productId);

	return (
		<div className="container mx-auto my-8 rounded-md bg-white p-8 shadow-lg">
			<div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
				<div className="flex justify-center md:col-span-1 lg:col-span-2">
					<Image
						src={product.coverImage.src}
						alt={product.coverImage.alt}
						className="max-h-[100vh] w-auto"
						width={300}
						height={700}
					/>
				</div>

				<div className="md:col-span-1 lg:col-span-1">
					<h1 className="mb-4 text-3xl font-bold">{product.name}</h1>
					<p className="mb-4 text-gray-600">{product.description}</p>
					<p className="mb-4 font-bold text-blue-500">{formatPrice(product.price / 100)}</p>
					{/* <button className="rounded-md bg-blue-500 px-4 py-2 text-white transition hover:bg-blue-600">
						Add to Cart
					</button> */}
				</div>
			</div>
		</div>
	);
}
