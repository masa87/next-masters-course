import React from "react";
import { type ProductType } from "../types";
import { ProductItemImage } from "../atoms/ProductItemImage";

type ProductListType = {
	products: ProductType[];
};

export const ProductList = ({ products }: ProductListType) => {
	return (
		<div className="flex items-center justify-center gap-3" data-testid="products-list">
			{products.map((product: ProductType) => (
				<ProductItemImage product={product} key={product.id} />
			))}
		</div>
	);
};
