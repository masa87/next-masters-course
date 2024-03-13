"use client";

import React from "react";
import Image from "next/image";

const SearchInput = () => {
	let searchTimeout: NodeJS.Timeout;

	const handleSearch: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
		const value = e.currentTarget.value;
		clearTimeout(searchTimeout);

		if (value.length > 2) {
			searchTimeout = setTimeout(() => {
				window.location.href = `/search?query=${value}`;
			}, 500);
		}
	};

	return (
		<>
			<div className="relative md:block">
				<div className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3">
					<Image
						src={"/icons/search.svg"}
						alt={"search"}
						width={20}
						height={20}
						className="text-gray-500"
					/>

					<span className="sr-only">Search icon</span>
				</div>
				<input
					type="text"
					aria-label="search"
					role="searchbox"
					onKeyUp={handleSearch}
					className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2 ps-10 text-sm text-gray-900 focus:border-blue-600
           focus:ring-blue-600 focus-visible:border-blue-600"
					placeholder="Search..."
				/>
			</div>
		</>
	);
};

export default SearchInput;
