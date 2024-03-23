import { notFound } from "next/navigation";
import { CollectionGetProductsListDocument, CollectionsGetListDocument } from "@/gql/graphql";
import { executeGraphql } from "@/app/api/graphqlApi";
import { CollectionList } from "@/app/components/organisms/CollectionList";

export const generateStaticParams = async () => {
	const { collections } = await executeGraphql({
		query: CollectionsGetListDocument,
		variables: {
			countItems: 8,
			offset: 0,
		},
	});

	return collections.data.map((collection) => {
		return {
			collectionSlug: collection.slug,
		};
	});
};

export async function generateMetadata({ params }: { params: { collectionSlug: string } }) {
	const { collection } = await executeGraphql({
		query: CollectionGetProductsListDocument,
		variables: {
			slug: params.collectionSlug,
		},
	});

	return {
		title: collection?.products[0]?.collections[0]?.name,
		description: collection?.products[0]?.collections[0]?.description,
	};
}

export default async function CategoryProductPage({
	params,
}: {
	params: { collectionSlug: string };
}) {
	const { collection } = await executeGraphql({
		query: CollectionGetProductsListDocument,
		variables: {
			slug: params.collectionSlug,
		},
	});

	if (!collection?.products) {
		throw notFound();
	}

	return (
		<section className="container mx-auto">
			<h1 className="my-6 text-2xl font-semibold">
				{collection.products[0]?.collections[0]?.name}
			</h1>

			<ul
				className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 [&>*:nth-child(3)]:lg:hidden [&>*:nth-child(3)]:2xl:flex"
				data-testid="products-list"
			>
				<CollectionList products={collection.products} />
			</ul>
		</section>
	);
}
