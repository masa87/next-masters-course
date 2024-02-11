import React from "react";
import { type ProductType } from "../types";
import { formatPrice } from "../utils";

type ProductItemDescriptionProps = {
	product: ProductType;
};

export const ProductItemDescription = ({
	product: { name, category, price },
}: ProductItemDescriptionProps) => {
	return (
		<div className="mt-2 flex flex-col px-3">
			<div className="flex justify-between">
				<h3 className=" text-sm text-gray-500 first-letter:capitalize dark:text-gray-400">
					{name}
				</h3>
				<p className="font-bold">{formatPrice(price / 100)}</p>
			</div>

			<p className="mt-1 text-xs italic text-gray-500 first-letter:capitalize dark:text-gray-400">
				{category}
			</p>
		</div>
	);
};
