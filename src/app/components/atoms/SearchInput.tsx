"use client";

import { Search } from "lucide-react";
import React from "react";

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
			<button
				type="button"
				data-collapse-toggle="navbar-search"
				aria-controls="navbar-search"
				aria-expanded="false"
				className="me-1 rounded-lg p-2.5 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 md:hidden dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
			>
				<Search size={20} />
				<span className="sr-only">Search</span>
			</button>
			<div className="relative hidden md:block">
				<div className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3">
					<Search size={20} className="text-gray-500 dark:text-gray-400" />

					<span className="sr-only">Search icon</span>
				</div>
				<input
					type="text"
					onKeyUp={handleSearch}
					id="search-navbar"
					className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2 ps-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 focus-visible:border-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
					placeholder="Search..."
				/>
			</div>
		</>
	);
};

export default SearchInput;
