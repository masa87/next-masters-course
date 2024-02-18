import React from "react";
import { type ProductType } from "../types";
import ProductItem from "../molecules/ProductItem";
import { getItemsWithOffset } from "@/app/api/getAllProducts";
type ProductListType = {
	products?: ProductType[];
	page?: number;
};

export const ProductList = async ({ products, page }: ProductListType) => {
	let productToView: ProductType[] = [];
	if (page) {
		const take = 10;
		const offset = 10 * (page - 1);
		productToView = await getItemsWithOffset(take, offset);
	} else if (products) {
		productToView = products;
	}

	return (
		<>
			{productToView.map((product: ProductType) => (
				<li
					key={product.id}
					className="cursor-pointer overflow-hidden rounded-lg bg-white shadow-md transition-all hover:scale-105"
				>
					<ProductItem product={product} />
				</li>
			))}
		</>
	);
};
