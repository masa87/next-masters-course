import { notFound } from "next/navigation";
import { Suspense } from "react";
import { ProductList } from "@/app/components/organisms/ProductList";
import { CategoryGetProductsListDocument } from "@/gql/graphql";
import { executeGraphql } from "@/app/api/graphqlApi";
import Pagination from "@/app/components/atoms/Pagination";
import Spinner from "@/app/components/atoms/Spinner";

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
			<Suspense fallback={<Spinner className="my-28 h-[50%] w-full" />}>
				<ul
					className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4"
					data-testid="products-list"
				>
					<ProductList products={productsToRender} page={parseInt(params.pageNumber)} />
				</ul>
			</Suspense>
			<Pagination
				currentPage={parseInt(params.pageNumber)}
				countItems={8}
				itemsPerPage={8}
				totalItemsCount={8}
			/>
		</section>
	);
}
