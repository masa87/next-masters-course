import React, { Suspense } from "react";
import Link from "next/link";
import { ProductItemImage } from "../atoms/ProductItemImage";
import { ProductItemDescription } from "../atoms/ProductItemDescription";
import { type ProductItemFragmentFragment } from "@/gql/graphql";

type ProductItemProps = {
	product: ProductItemFragmentFragment;
};

const ProductItem = ({ product }: ProductItemProps) => {
	return (
		<Link href={`/product/${product.id}`}>
			<article>
				<Suspense>
					{product.images[0] && <ProductItemImage url={product.images[0].url} alt={product.name} />}
				</Suspense>
				<ProductItemDescription product={product} />
			</article>
		</Link>
	);
};

export default ProductItem;
