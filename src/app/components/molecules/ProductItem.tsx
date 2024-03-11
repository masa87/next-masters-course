import React from "react";
import Link from "next/link";
import { ProductItemImage } from "../atoms/ProductItemImage";
import { ProductItemDescription } from "../atoms/ProductItemDescription";
import { type ProductItemFragmentFragment } from "@/gql/graphql";

type ProductItemProps = {
	product: ProductItemFragmentFragment;
	priority?: boolean;
};

const ProductItem = ({ product, priority }: ProductItemProps) => {
	return (
		<Link href={`/product/${product.id}`}>
			<article>
				{product.images[0] && (
					<ProductItemImage url={product.images[0].url} alt={product.name} priority={priority} />
				)}
				<ProductItemDescription product={product} />
			</article>
		</Link>
	);
};

export default ProductItem;
