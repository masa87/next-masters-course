import { Suspense } from "react";
import { getAllProducts, getItemsWithOffset } from "@/app/api/getAllProducts";
import Pagination from "@/app/components/atoms/Pagination";
import { ProductList } from "@/app/components/organisms/ProductList";

export const generateStaticParams = async () => {
	const allProducts = await getAllProducts();
	return allProducts.map((product) => {
		return {
			productId: product.id,
		};
	});
};

export default async function ProductPageWithPagination({
	params,
}: {
	params: { pageNumber: string };
}) {
	const products = await getItemsWithOffset(20, (parseInt(params.pageNumber) - 1) * 20);

	return (
		<section className="container mx-auto">
			<ul
				className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4"
				data-testid="products-list"
			>
				<Suspense>
					<ProductList products={products} page={parseInt(params.pageNumber)} />
				</Suspense>
				<Suspense>
					<ProductList products={products} page={parseInt(params.pageNumber) + 1} />
				</Suspense>
			</ul>
			<Pagination currentPage={parseInt(params.pageNumber)} />
		</section>
	);
}
