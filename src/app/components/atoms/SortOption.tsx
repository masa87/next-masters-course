"use client";

import { usePathname, useRouter } from "next/navigation";
import React from "react";

const SortOption = ({
	option,
	title,
	dataTestId,
}: {
	option: string;
	title: string;
	dataTestId: string;
}) => {
	const router = useRouter();
	const pathname = usePathname();

	return (
		<button
			type="button"
			className="hover:blue-500 cursor-pointer rounded-md bg-white p-3 font-medium shadow-sm transition-all hover:scale-105 "
			onClick={() => router.push(`${pathname}/?sortBy=${option}`)}
			data-testid={dataTestId}
		>
			{title}
		</button>
	);
};

export default SortOption;
