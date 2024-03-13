import React from "react";
import Link from "next/link";
import { ProductItemImage } from "../atoms/ProductItemImage";
import { type CollectionItemFragmentFragment } from "@/gql/graphql";

type CollectionItemProps = {
	collection: CollectionItemFragmentFragment;
};

const CollectionItem = ({ collection }: CollectionItemProps) => {
	return (
		<li
			key={collection.id}
			className="cursor-pointer overflow-hidden rounded-lg bg-white shadow-md transition-all hover:scale-105"
		>
			<Link href={`/collections/${collection.slug}`}>
				{collection.products[0]?.images[0] && (
					<ProductItemImage url={collection.products[0]?.images[0]?.url} alt={collection.name} />
				)}
				<h3 className="mb-2 text-center text-xl font-semibold first-letter:capitalize">
					{collection.name}
				</h3>
			</Link>
		</li>
	);
};

export default CollectionItem;
