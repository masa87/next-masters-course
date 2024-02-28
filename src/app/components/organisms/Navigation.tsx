"use client";

import React from "react";
import { Search } from "lucide-react";
import { ActiveLink } from "../atoms/ActiveLink";

const Navigation = () => {
	let searchTimeout: NodeJS.Timeout;

	const handleSearch: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
		const value = e.currentTarget.value;
		clearTimeout(searchTimeout);
		searchTimeout = setTimeout(() => {
			window.location.href = `/search?query=${value}`;
		}, 500);
	};

	return (
		<nav className="fixed z-50 w-full bg-black font-semibold shadow-md">
			<div className="container mx-auto flex items-center justify-between p-4">
				<div className="space-x-4">
					<ActiveLink
						href={"/"}
						className="text-white transition-all hover:text-blue-500"
						activeClassName="border-b-2 border-blue-500"
					>
						Home
					</ActiveLink>
					<ActiveLink
						href={"/products"}
						className="text-white transition-all hover:text-blue-500"
						activeClassName="border-b-2 border-blue-500"
						exact={false}
					>
						All
					</ActiveLink>
					<ActiveLink
						href={"/categories"}
						className="text-white transition-all hover:text-blue-500"
						activeClassName="border-b-2 border-blue-500"
						exact={false}
					>
						Categories
					</ActiveLink>
					<ActiveLink
						href={"/collections"}
						className="text-white transition-all hover:text-blue-500"
						activeClassName="border-b-2 border-blue-500"
						exact={false}
					>
						Collections
					</ActiveLink>
				</div>
				<label className="relative">
					<input
						onKeyUp={handleSearch}
						type="text"
						placeholder="Search"
						className="cursor-pointer rounded-md px-2 py-1 font-normal placeholder:text-sm placeholder:font-normal focus-visible:border-none active:border-none"
					/>
					<Search size={20} color="gray" className="absolute right-2 top-[6px]" />
				</label>
			</div>
		</nav>
	);
};

export default Navigation;
