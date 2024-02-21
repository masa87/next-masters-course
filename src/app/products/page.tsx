import { Suspense } from "react";
import Pagination from "../components/atoms/Pagination";
import Spinner from "../components/atoms/Spinner";
import { ProductList } from "@/app/components/organisms/ProductList";
import { getAllProducts } from "@/app/api/getAllProducts";

export const generateStaticParams = async () => {
	const products = await getAllProducts();
	return products;
};

export default async function ProductsPage() {
	return (
		<>
			<ul
				className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4"
				data-testid="products-list"
			>
				<Suspense fallback={<Spinner />}>
					<ProductList page={1} />
				</Suspense>
			</ul>
			<Pagination currentPage={1} />
		</>
	);
}
