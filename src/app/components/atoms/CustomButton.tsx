"use client";

import React, { type ReactNode } from "react";
import { useFormStatus } from "react-dom";

const CustomButton = ({
	title,
	children,
	dataTestId,
}: {
	title?: string;
	children?: ReactNode;
	dataTestId?: string;
}) => {
	const status = useFormStatus();

	return (
		<button
			type="submit"
			data-testid={dataTestId}
			disabled={status.pending}
			className="rounded-md bg-blue-600 px-4 py-2 font-semibold text-white transition hover:bg-blue-600 disabled:cursor-not-allowed disabled:bg-blue-400"
		>
			{title || children}
		</button>
	);
};

export default CustomButton;
