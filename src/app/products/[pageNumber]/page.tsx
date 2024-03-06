import { Suspense } from "react";
import { notFound } from "next/navigation";
import { ProductList } from "@/app/components/organisms/ProductList";
import Spinner from "@/app/components/atoms/Spinner";
import Pagination from "@/app/components/atoms/Pagination";
import { executeGraphql } from "@/app/api/graphqlApi";
import { ProductsGetListByCountItemsDocument } from "@/gql/graphql";

export const generateStaticParams = async () => {
	return [{ pagNumber: "1" }, { pageNumber: "2" }, { pageNumber: "3" }];
};

export default async function ProductPageWithPagination({
	params,
}: {
	params: { pageNumber: string };
}) {
	const countItems: number = 8;
	const offset = (parseInt(params.pageNumber) - 1) * 8;
	const products = await executeGraphql({
		query: ProductsGetListByCountItemsDocument,
		variables: {
			countItems: countItems,
			offset: offset,
		},
		next: {
			revalidate: 30,
		},
	});

	if (!products.products.data.length) {
		notFound();
	}

	const productsToRender = products.products.data;

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
				countItems={products.products.meta.count}
				itemsPerPage={countItems}
				totalItemsCount={products.products.meta.total}
			/>
		</section>
	);
}
