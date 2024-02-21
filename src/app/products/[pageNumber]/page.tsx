import { Suspense } from "react";
import { getAllProducts, getItemsWithOffset } from "@/app/api/getAllProducts";
import Pagination from "@/app/components/atoms/Pagination";
import { ProductList } from "@/app/components/organisms/ProductList";
import Spinner from "@/app/components/atoms/Spinner";

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
			<Suspense fallback={<Spinner className="my-28 h-[50%] w-full" />}>
				<ul
					className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4"
					data-testid="products-list"
				>
					<ProductList products={products} page={parseInt(params.pageNumber)} />
				</ul>
			</Suspense>
			<Pagination currentPage={parseInt(params.pageNumber)} />
		</section>
	);
}
