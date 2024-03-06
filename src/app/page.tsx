import { ProductList } from "./components/organisms/ProductList";
import { executeGraphql } from "./api/graphqlApi";
import { ProductsGetListByCountItemsDocument } from "@/gql/graphql";

export default async function Home() {
	const products = await executeGraphql({
		query: ProductsGetListByCountItemsDocument,
		variables: {
			countItems: 8,
			offset: 0,
		},
	});

	return (
		<section className="container mx-auto">
			<ul
				className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4"
				data-testid="products-list"
			>
				<ProductList products={products.products.data} />
			</ul>
		</section>
	);
}
