import { notFound } from "next/navigation";
import Link from "next/link";
import { ProductItemImage } from "../components/atoms/ProductItemImage";
import { CollectionsGetListDocument } from "@/gql/graphql";
import { executeGraphql } from "@/app/api/graphqlApi";

export const generateStaticParams = async () => {
	const collections = await executeGraphql({
		query: CollectionsGetListDocument,
		variables: {
			countItems: 8,
			offset: 0,
		},
	});
	return collections.collections.data.map((collection) => {
		return {
			collectionId: collection.id,
		};
	});
};

export default async function Collection() {
	const collections = await executeGraphql({
		query: CollectionsGetListDocument,
		variables: {
			countItems: 8,
			offset: 0,
		},
	});
	if (!collections) {
		throw notFound();
	}
	return (
		<section className="container mx-auto">
			<ul className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
				{collections.collections.data.map((collection) => (
					<li
						key={collection.id}
						className="cursor-pointer overflow-hidden rounded-lg bg-white shadow-md transition-all hover:scale-105"
					>
						<Link href={`/collections/${collection.slug}`}>
							{collection.products[0]?.images[0] && (
								<ProductItemImage
									url={collection.products[0]?.images[0]?.url}
									alt={collection.name}
								/>
							)}
							<h3 className="mb-2 text-center text-xl font-semibold first-letter:capitalize">
								{collection.name}
							</h3>
						</Link>
					</li>
				))}
			</ul>
		</section>
	);
}
