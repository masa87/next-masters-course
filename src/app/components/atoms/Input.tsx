import clsx from "clsx";
import React from "react";

type InputProps = {
	name: string;
	label: string;
	placeholder: string;
	type: string;
	className?: string;
	required?: boolean;
};

const Input = ({ name, label, placeholder, type, className, required }: InputProps) => {
	return (
		<label
			htmlFor={name}
			className="flex w-full flex-col gap-1 text-center first-letter:capitalize"
		>
			{label}
			{type === "textarea" ? (
				<textarea
					required={required}
					rows={1}
					id={name}
					name={name}
					placeholder={placeholder}
					className={clsx(
						className,
						"block w-full rounded-lg border border-gray-300 bg-gray-50 p-2 ps-3 text-sm text-gray-900 focus:border-blue-600 focus:ring-blue-600 focus-visible:border-blue-600",
					)}
				/>
			) : (
				<input
					required={required}
					type={type}
					id={name}
					name={name}
					placeholder={placeholder}
					className={clsx(
						className,
						"block w-full rounded-lg border border-gray-300 bg-gray-50 p-2 ps-3 text-sm text-gray-900 focus:border-blue-600 focus:ring-blue-600 focus-visible:border-blue-600",
					)}
				/>
			)}
		</label>
	);
};

export default Input;
