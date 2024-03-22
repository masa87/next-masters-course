import React from "react";
import SortOption from "../atoms/SortOption";

const SortOptionsList = () => {
	const options = [
		{ slug: "priceAsc", title: "Price Ascending", dataAttribute: "sort-by-price" },
		{ slug: "priceDesc", title: "Price Descending", dataAttribute: "sort-by-price" },
		{ slug: "ratingAsc", title: "Rating Ascending", dataAttribute: "sort-by-rating" },
		{ slug: "ratingDesc", title: "Rating Descending", dataAttribute: "sort-by-rating" },
	];

	return (
		<div className="flex gap-4">
			{options.map((option) => (
				<SortOption
					key={option.slug}
					option={option.slug}
					title={option.title}
					dataTestId={option.dataAttribute}
				/>
			))}
		</div>
	);
};

export default SortOptionsList;
