import React from "react";
import { notFound } from "next/navigation";
import ProductItem from "../molecules/ProductItem";
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
		<>
			{products.map((product, index) => (
				<li
					key={product.id}
					className="cursor-pointer overflow-hidden rounded-lg bg-white shadow-md transition-all hover:scale-105"
				>
					<ProductItem product={product} priority={index <= 2 && true} />
				</li>
			))}
		</>
	);
};
