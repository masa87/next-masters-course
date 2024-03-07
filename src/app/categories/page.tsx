import { Suspense } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ProductItemImage } from "../components/atoms/ProductItemImage";
import Spinner from "@/app/components/atoms/Spinner";
import { CategoriesGetListDocument } from "@/gql/graphql";
import { executeGraphql } from "@/app/api/graphqlApi";

// export const generateStaticParams = async () => {
// 	const categories = await executeGraphql(CategoriesGetListDocument, {
// 		countItems: 6,
// 		offset: 0,
// 	});
// 	return categories.categories.data.map((product) => {
// 		return {
// 			productId: product.id,
// 		};
// 	});
// };

export default async function CategoryProductPage() {
	const categories = await executeGraphql({
		query: CategoriesGetListDocument,
		variables: {
			countItems: 8,
			offset: 0,
		},
	});
	if (!categories) {
		throw notFound();
	}

	const categoriesToRender = categories.categories.data;

	return (
		<section className="container mx-auto">
			<Suspense fallback={<Spinner className="my-28 h-screen w-full" />}>
				<ul
					className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4"
					data-testid="products-list"
				>
					{categoriesToRender.map((category) => (
						<li
							key={category.id}
							className="cursor-pointer overflow-hidden rounded-lg bg-white shadow-md transition-all hover:scale-105"
						>
							<Link href={`/categories/${category.slug}/1`}>
								{category.products[0]?.images[0] && (
									<ProductItemImage
										url={category.products[0]?.images[0]?.url}
										alt={category.name}
									/>
								)}
								<h3 className="mb-2 text-center text-xl font-semibold first-letter:capitalize">
									{category.name}
								</h3>
							</Link>
						</li>
					))}
				</ul>
			</Suspense>
		</section>
	);
}
