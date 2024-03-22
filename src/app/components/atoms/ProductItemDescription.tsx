import React from "react";
import Image from "next/image";
import { type ProductItemFragmentFragment } from "@/gql/graphql";

type ProductItemDescriptionProps = {
	product: ProductItemFragmentFragment;
};

export const ProductItemDescription = ({
	product: { name, categories, price, rating },
}: ProductItemDescriptionProps) => {
	return (
		<div className="flex flex-col justify-between gap-2 px-6 py-4">
			<h3 className="text-xl font-semibold first-letter:capitalize">{name}</h3>
			<div className="flex items-center justify-end">
				{Array.from({ length: Number(rating?.toFixed(2)) }, (_, i) => i + 1).map((i, j) => (
					<Image key={j} src={"/icons/star.svg"} alt="x-icon" width={15} height={15} />
				))}
				<div className="ml-2">
					<span data-testid="product-rating">{rating?.toFixed(2)}</span>/5
				</div>
			</div>
			<div className="flex justify-between">
				<p className=" text-gray-600 first-letter:capitalize ">{categories[0]?.name}</p>
				<p className="font-bold text-blue-600">
					<span data-testid="product-price">{price / 100} </span>
					<span> zł</span>
				</p>
			</div>
		</div>
	);
};
