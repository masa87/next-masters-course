import { executeGraphql } from "../api/graphqlApi";
import { ProductList } from "../components/organisms/ProductList";
import { ProductsSearchByWordDocument } from "@/gql/graphql";

export default async function SearchByProductsList({
	searchParams,
}: {
	searchParams: { query: string };
}) {
	const { products } = await executeGraphql({
		query: ProductsSearchByWordDocument,
		variables: {
			searchBy: searchParams.query,
		},
	});

	return (
		<>
			{!products.data || products.data.length === 0 ? (
				<h1 className="mt-5 text-center text-2xl font-semibold">No products found</h1>
			) : (
				<section className="container mx-auto">
					<ul
						className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4"
						data-testid="products-list"
					>
						<ProductList products={products.data} />
					</ul>
				</section>
			)}
		</>
	);
}
