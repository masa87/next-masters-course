import { ProductList } from "./components/organisms/ProductList";
import { executeGraphql } from "./api/graphqlApi";
import Collection from "./collections/page";
import { ProductsGetListByCountItemsDocument } from "@/gql/graphql";

export default async function Home() {
	const products = await executeGraphql({
		query: ProductsGetListByCountItemsDocument,
		variables: {
			countItems: 4,
			offset: 0,
		},
	});

	return (
		<>
			<h2 className="my-6 text-2xl font-semibold">Latest collections:</h2>
			<Collection />
			<section className="container mx-auto mt-40">
				<ul
					className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 [&>*:nth-child(3)]:lg:hidden [&>*:nth-child(3)]:2xl:flex"
					data-testid="products-list"
				>
					<ProductList products={products.products.data} />
				</ul>
			</section>
		</>
	);
}
