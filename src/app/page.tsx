import { Suspense } from "react";
import Pagination from "./components/atoms/Pagination";
import { ProductList } from "./components/organisms/ProductList";

export default async function Home() {
	// const products = await getOnlyXItems(20);

	return (
		<section className="container mx-auto">
			<ul
				className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4"
				data-testid="products-list"
			>
				<Suspense>
					<ProductList page={1} />
				</Suspense>
				<Suspense>
					<ProductList page={2} />
				</Suspense>
			</ul>
			<Pagination currentPage={1} />
		</section>
	);
}
