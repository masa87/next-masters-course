import React from "react";
import { type ProductType } from "../types";
import { formatPrice } from "../utils";

type ProductItemDescriptionProps = {
	product: ProductType;
};

export const ProductItemDescription = ({
	product: { category, price },
}: ProductItemDescriptionProps) => {
	return (
		<div className="mt-2 flex flex-col">
			<div className="flex justify-between text-sm text-gray-500 first-letter:capitalize dark:text-gray-400">
				Produkt <span className="font-bold">{formatPrice(price / 100)}</span>
			</div>
			<div className="mt-1 text-xs italic text-gray-500 first-letter:capitalize dark:text-gray-400">
				{category}
			</div>
		</div>
	);
};
