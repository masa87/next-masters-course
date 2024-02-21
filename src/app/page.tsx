import { Suspense } from "react";
import { ProductList } from "./components/organisms/ProductList";
import { getOnlyXItems } from "./api/getAllProducts";
import Spinner from "./components/atoms/Spinner";

export default async function Home() {
	const products = await getOnlyXItems(8);

	return (
		<section className="container mx-auto">
			<ul
				className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4"
				data-testid="products-list"
			>
				<Suspense fallback={<Spinner />}>
					<ProductList products={products} />
				</Suspense>
			</ul>
		</section>
	);
}
