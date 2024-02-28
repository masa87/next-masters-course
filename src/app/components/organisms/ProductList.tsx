import React, { Suspense } from "react";
import { notFound } from "next/navigation";
import ProductItem from "../molecules/ProductItem";
import Spinner from "../atoms/Spinner";
import { type ProductItemFragmentFragment } from "@/gql/graphql";

type ProductListType = {
	products?: ProductItemFragmentFragment[];
	page?: number;
};

export const ProductList = async ({ products }: ProductListType) => {
	if (!products) {
		throw notFound();
	}

	return (
		<Suspense fallback={<Spinner />}>
			{products.map((product) => (
				<li
					key={product.id}
					className="cursor-pointer overflow-hidden rounded-lg bg-white shadow-md transition-all hover:scale-105"
				>
					<ProductItem product={product} />
				</li>
			))}
		</Suspense>
	);
};
