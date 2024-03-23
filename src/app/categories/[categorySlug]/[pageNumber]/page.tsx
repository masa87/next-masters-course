import { notFound } from "next/navigation";
import { type Metadata } from "next";
import { ProductList } from "@/app/components/organisms/ProductList";
import { CategoriesGetListDocument, CategoryGetProductsListDocument } from "@/gql/graphql";
import { executeGraphql } from "@/app/api/graphqlApi";
import Pagination from "@/app/components/atoms/Pagination";

export const generateStaticParams = async () => {
	const { categories } = await executeGraphql({
		query: CategoriesGetListDocument,
		variables: {
			countItems: 8,
			offset: 0,
		},
	});

	return categories.data.map((category) => {
		return {
			categorySlug: category.slug,
			pageNumber: "1",
		};
	});
};

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
	const { category } = await executeGraphql({
		query: CategoryGetProductsListDocument,
		variables: {
			slug: params.categorySlug,
		},
	});

	if (!category?.products) {
		throw notFound();
	}

	return (
		<section className="container mx-auto">
			<h1 className="my-6 text-2xl font-semibold">{category.name}</h1>
			<ul
				className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 [&>*:nth-child(7)]:lg:hidden [&>*:nth-child(7)]:2xl:flex"
				data-testid="products-list"
			>
				<ProductList products={category.products} page={parseInt(params.pageNumber)} />
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
