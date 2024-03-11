import React from "react";
import { Star } from "lucide-react";

type ReviewListProps = {
	reviews: {
		id: string;
		title: string;
		description: string;
		rating: number;
		email: string;
		author: string;
		updatedAt: unknown;
	}[];
};

const ReviewList = ({ reviews }: ReviewListProps) => {
	const reviewsToRender = reviews.map((review) => {
		return {
			id: review.id,
			title: review.title,
			description: review.description,
			rating: review.rating,
			email: review.email,
			author: review.author,
			updatedAt: new Date(review.updatedAt as Date).getTime(),
		};
	});

	const sortedByReviewDate = reviewsToRender.sort((a, b) => {
		return b.updatedAt - a.updatedAt;
	});

	return (
		<div className="mt-5 space-y-4">
			{sortedByReviewDate.map((review) => (
				<div key={review.id} className="rounded-md bg-white p-6 shadow-md">
					<div className="mb-4 flex items-center">
						<p className="text-lg font-semibold">Author: {review.author}</p>
						<div className="ml-auto flex items-center space-x-2">
							<p className="text-gray-600">{review.rating}/5</p>
							<div className="flex">
								{Array.from({ length: review.rating }, (_, index) => (
									<Star key={index} className="h-5 w-5 fill-current text-yellow-500" />
								))}
							</div>
						</div>
					</div>
					<p className="text-gray-700">{review.description}</p>
					<div className="mx-auto flex justify-end text-xs italic text-gray-500">
						<p className="">
							{new Date(review.updatedAt).toLocaleString("en-GB", { timeZone: "UTC" })}
						</p>
					</div>
				</div>
			))}
		</div>
	);
};

export default ReviewList;
