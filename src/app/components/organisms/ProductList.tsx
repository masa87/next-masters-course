import React from "react";
import { type ProductType } from "../types";
import { ProductItemImage } from "../atoms/ProductItemImage";
import { ProductItemDescription } from "../atoms/ProductItemDescription";

type ProductListType = {
	products: ProductType[];
};

export const ProductList = ({ products }: ProductListType) => {
	return (
		<ul
			className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4"
			data-testid="products-list"
		>
			{products.map((product: ProductType) => (
				<li
					key={product.id}
					className="cursor-pointer overflow-hidden rounded-lg bg-white shadow-md transition-all hover:scale-105"
				>
					<article>
						<ProductItemImage product={product} />
						<ProductItemDescription product={product} />
					</article>
				</li>
			))}
		</ul>
	);
};
