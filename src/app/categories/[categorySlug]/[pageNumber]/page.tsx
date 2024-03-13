import { notFound } from "next/navigation";
import { type Metadata } from "next";
import { ProductList } from "@/app/components/organisms/ProductList";
import { CategoryGetProductsListDocument } from "@/gql/graphql";
import { executeGraphql } from "@/app/api/graphqlApi";
import Pagination from "@/app/components/atoms/Pagination";

export async function generateMetadata({
	params,
}: {
	params: { categorySlug: string };
}): Promise<Metadata> {
	const categories = await executeGraphql({
		query: CategoryGetProductsListDocument,
		variables: {
			slug: params.categorySlug,
		},
	});

	return {
		title: categories?.category?.name,
		description: "",
	};
}

export default async function CategoryProductPage({
	params,
}: {
	params: { categorySlug: string; pageNumber: string };
}) {
	const categories = await executeGraphql({
		query: CategoryGetProductsListDocument,
		variables: {
			slug: params.categorySlug,
		},
	});

	if (!categories.category?.products) {
		throw notFound();
	}

	const productsToRender = categories.category.products;

	return (
		<section className="container mx-auto">
			<h1 className="my-6 text-2xl font-semibold">{categories.category.name}</h1>
			<ul
				className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4"
				data-testid="products-list"
			>
				<ProductList products={productsToRender} page={parseInt(params.pageNumber)} />
			</ul>
			<Pagination
				currentPage={parseInt(params.pageNumber)}
				countItems={8}
				itemsPerPage={8}
				totalItemsCount={8}
				baseUrl={`/categories/${params.categorySlug}`}
			/>
		</section>
	);
}
