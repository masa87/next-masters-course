import React from "react";
import CollectionItem from "../molecules/CollectionItem";
import { executeGraphql } from "@/app/api/graphqlApi";
import { CollectionsGetListDocument } from "@/gql/graphql";

const Collections = async () => {
	const collections = await executeGraphql({
		query: CollectionsGetListDocument,
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
				{collections.collections.data.map((collection) => (
					<CollectionItem key={collection.id} collection={collection} />
				))}
			</ul>
		</section>
	);
};

export default Collections;
