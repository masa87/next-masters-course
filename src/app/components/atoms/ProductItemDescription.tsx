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
		<div className="p-6">
			<div className="flex justify-between">
				<h3 className="mb-2 text-xl font-semibold first-letter:capitalize ">{name}</h3>
				<p className="font-bold text-slate-800">{formatPrice(price / 100)}</p>
			</div>

			<p className="mb-4 text-gray-600 first-letter:capitalize ">{category}</p>
		</div>
	);
};
