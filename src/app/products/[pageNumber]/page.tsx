import { notFound } from "next/navigation";
import { Suspense } from "react";
import { ProductList } from "@/app/components/organisms/ProductList";
import Pagination from "@/app/components/atoms/Pagination";
import { executeGraphql } from "@/app/api/graphqlApi";
import { ProductsGetListByCountItemsDocument } from "@/gql/graphql";
import Spinner from "@/app/components/atoms/Spinner";
import SortOptionsList from "@/app/components/organisms/SortOptionsList";

export const generateStaticParams = async () => {
	return [{ pagNumber: "1" }, { pageNumber: "2" }, { pageNumber: "3" }];
};

export default async function ProductPageWithPagination({
	params,
	searchParams,
}: {
	params: { pageNumber: string };
	searchParams: { sortBy: "priceAsc" | "priceDesc" | "ratingAsc" | "ratingDesc" };
}) {
	const countItems: number = 8;
	const offset = (parseInt(params.pageNumber) - 1) * 8;
	const { products } = await executeGraphql({
		query: ProductsGetListByCountItemsDocument,
		variables: {
			countItems: countItems,
			offset: offset,
		},
		next: {
			revalidate: 30,
		},
	});

	if (!products.data.length) {
		notFound();
	}

	switch (searchParams.sortBy) {
		case "priceAsc":
			products.data.sort((a, b) => a.price - b.price);
			break;
		case "priceDesc":
			products.data.sort((a, b) => b.price - a.price);
			break;
		case "ratingAsc":
			products.data.sort((a, b) => (a.rating || 0) - (b.rating || 0));
			break;
		case "ratingDesc":
			products.data.sort((a, b) => (b.rating || 0) - (a.rating || 0));
			break;
		default:
			break;
	}

	return (
		<section className="container mx-auto">
			<div className="my-5 flex min-w-60 justify-center">
				<SortOptionsList />
			</div>
			<Suspense fallback={<Spinner className="my-28 h-[50%] w-full" />}>
				<ul
					className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4"
					data-testid="products-list"
				>
					<ProductList products={products.data} page={parseInt(params.pageNumber)} />
				</ul>
			</Suspense>
				<Pagination
					currentPage={parseInt(params.pageNumber)}
					countItems={products.meta.count}
					itemsPerPage={countItems}
					totalItemsCount={products.meta.total}
					baseUrl={"/products"}
				/>
		</section>
	);
}
