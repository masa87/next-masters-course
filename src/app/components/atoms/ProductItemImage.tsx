import Image from "next/image";
import { type ProductType } from "../types";
import { ProductItemDescription } from "./ProductItemDescription";

type ProductItemImageProps = {
	product: ProductType;
};

export const ProductItemImage = ({ product }: ProductItemImageProps) => {
	return (
		<li className="group h-full cursor-pointer bg-slate-100 p-3 shadow-md transition-all hover:bg-slate-200">
			<Image
				className="h-[200px] w-[200px] transition-all group-hover:scale-105"
				src={product.coverImage.src}
				alt={product.coverImage.alt}
				width={200}
				height={200}
				style={{ objectFit: "scale-down" }}
			/>
			<ProductItemDescription product={product} />
		</li>
	);
};
