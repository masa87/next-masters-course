"use client";

import React from "react";
import { useFormStatus } from "react-dom";

const CustomButton = ({ title }: { title: string }) => {
	const status = useFormStatus();

	return (
		<button
			type="submit"
			data-testid="add-review"
			disabled={status.pending}
			className="rounded-md bg-blue-500 px-4 py-2 font-semibold text-white transition hover:bg-blue-600 disabled:cursor-not-allowed disabled:bg-blue-400"
		>
			{title}
		</button>
	);
};

export default CustomButton;
