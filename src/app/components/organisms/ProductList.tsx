import React from "react";
import { type ProductType } from "../types";
import { ProductItemImage } from "../atoms/ProductItemImage";
import { ProductItemDescription } from "../atoms/ProductItemDescription";

type ProductListType = {
	products: ProductType[];
};

export const ProductList = ({ products }: ProductListType) => {
	return (
		<ul className="flex items-center justify-center gap-3" data-testid="products-list">
			{products.map((product: ProductType) => (
				<li key={product.id}>
					<article>
						<ProductItemImage product={product} />
						<ProductItemDescription product={product} />
					</article>
				</li>
			))}
		</ul>
	);
};
