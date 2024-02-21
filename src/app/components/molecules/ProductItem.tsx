"use client";
import React, { Suspense } from "react";
import Link from "next/link";
import { ProductItemImage } from "../atoms/ProductItemImage";
import { ProductItemDescription } from "../atoms/ProductItemDescription";
import { type ProductType } from "../types";

type ProductItemProps = {
	product: ProductType;
};

const ProductItem = ({ product }: ProductItemProps) => {
	return (
		<Link href={`/product/${product.id}`}>
			<article>
				<Suspense>
					<ProductItemImage product={product} />
				</Suspense>
				<ProductItemDescription product={product} />
			</article>
		</Link>
	);
};

export default ProductItem;
