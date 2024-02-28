import { Suspense } from "react";
import Spinner from "../components/atoms/Spinner";
import { executeGraphql } from "../api/graphqlApi";
import { ProductList } from "../components/organisms/ProductList";
import { ProductsSearchByWordDocument } from "@/gql/graphql";

export default async function SearchByProductsList({
	searchParams,
}: {
	searchParams: { query: string };
}) {
	const { products } = await executeGraphql(ProductsSearchByWordDocument, {
		searchBy: searchParams.query,
	});

	return (
		<section className="container mx-auto">
			<ul
				className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4"
				data-testid="products-list"
			>
				<Suspense fallback={<Spinner />}>
					<ProductList products={products.data} />
				</Suspense>
			</ul>
		</section>
	);
}
