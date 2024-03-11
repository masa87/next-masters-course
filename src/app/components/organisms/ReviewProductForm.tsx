import React from "react";
import Input from "../atoms/Input";

const ReviewProductForm = () => {
	return (
		<div className="flex w-full flex-col gap-2 md:flex-row">
			<label htmlFor="rating" className="flex flex-col gap-1 first-letter:capitalize">
				Rating
				<select
					name="rating"
					id="rating"
					className=" block w-16 cursor-pointer rounded-lg border border-gray-300 bg-gray-50 p-2 ps-3 text-sm text-gray-900 focus:border-blue-600 focus:ring-blue-600 focus-visible:border-blue-600"
				>
					<option value="1">1</option>
					<option value="2">2</option>
					<option value="3">3</option>
					<option value="4">4</option>
					<option value="5">5</option>
				</select>
			</label>
			<Input label="Title" name="headline" type="text" placeholder="Title" required />
			<Input label="Review" name="content" type="textarea" placeholder="Content" required />
			<Input label="Author" name="name" type="text" placeholder="Author" required />
			<Input label="E-mail" name="email" type="email" placeholder="E-mail" required />
		</div>
	);
};

export default ReviewProductForm;
