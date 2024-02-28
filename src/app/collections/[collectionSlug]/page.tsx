import { Suspense } from "react";
import { notFound } from "next/navigation";
import { ProductList } from "@/app/components/organisms/ProductList";
import Spinner from "@/app/components/atoms/Spinner";
import { CollectionGetProductsListDocument } from "@/gql/graphql";
import { executeGraphql } from "@/app/api/graphqlApi";

export default async function CategoryProductPage({
	params,
}: {
	params: { collectionSlug: string };
}) {
	const collection = await executeGraphql(CollectionGetProductsListDocument, {
		slug: params.collectionSlug,
	});

	if (!collection.collection?.products) {
		throw notFound();
	}

	const productsToRender = collection.collection.products;

	return (
		<section className="container mx-auto">
			<Suspense fallback={<Spinner className="my-28 h-[50%] w-full" />}>
				<ul
					className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4"
					data-testid="products-list"
				>
					<ProductList products={productsToRender} />
				</ul>
			</Suspense>
		</section>
	);
}
