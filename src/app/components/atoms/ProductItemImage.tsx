import Image from "next/image";
import { type ProductType } from "../types";

type ProductItemImageProps = {
	product: ProductType;
};

export const ProductItemImage = ({ product }: ProductItemImageProps) => {
	return (
		<Image
			className="h-64 w-full object-contain p-4"
			src={product.coverImage.src}
			alt={product.coverImage.alt}
			width={200}
			height={200}
		/>
	);
};
