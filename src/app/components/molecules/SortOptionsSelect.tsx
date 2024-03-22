"use client";

import React, { useId } from "react";
import Select, { type SingleValue } from "react-select";
import { usePathname, useRouter } from "next/navigation";

const SortOptionsSelect = ({
	options,
	placeholder,
}: {
	options: { value: string; label: string }[];
	placeholder: string;
}) => {
	const router = useRouter();
	const pathname = usePathname();

	const handleSelect = (
		e: SingleValue<{
			value: string;
			label: string;
		}>,
	) => {
		if (e) {
			router.push(`${pathname}?sortBy=${e?.value}`);
		} else {
			router.push(pathname);
		}
	};

	return (
		<Select
			isClearable
			className="cursor-pointer"
			options={options}
			placeholder={placeholder}
			instanceId={useId()}
			onChange={handleSelect}
		/>
	);
};

export default SortOptionsSelect;
