import Image from "next/image";
import { type ProductType } from "../types";

type ProductItemImageProps = {
	product: ProductType;
};

export const ProductItemImage = ({ product }: ProductItemImageProps) => {
	return (
		<div className="group h-full cursor-pointer rounded-md bg-slate-100 p-3 shadow-md transition-all hover:bg-slate-200">
			<Image
				className="h-[200px] w-[200px] rounded-md transition-all group-hover:scale-105"
				src={product.coverImage.src}
				alt={product.coverImage.alt}
				width={200}
				height={200}
				style={{ objectFit: "scale-down" }}
			/>
		</div>
	);
};
