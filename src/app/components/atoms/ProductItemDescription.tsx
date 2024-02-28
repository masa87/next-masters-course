import React from "react";
import { formatPrice } from "../utils";
import { type ProductItemFragmentFragment } from "@/gql/graphql";

type ProductItemDescriptionProps = {
	product: ProductItemFragmentFragment;
};

export const ProductItemDescription = ({
	product: { name, categories, price },
}: ProductItemDescriptionProps) => {
	return (
		<div className="flex flex-col justify-between gap-5 px-6 py-4">
			<h3 className="text-center text-xl font-semibold first-letter:capitalize">{name}</h3>
			<div className="flex justify-between">
				<p className=" text-gray-600 first-letter:capitalize ">{categories[0]?.name}</p>

				<p className="font-bold text-slate-800">{formatPrice(price / 100)}</p>
			</div>
		</div>
	);
};
