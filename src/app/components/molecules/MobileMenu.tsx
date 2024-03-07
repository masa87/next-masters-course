"use client";

import React, { useState } from "react";
import { Menu } from "lucide-react";
import clsx from "clsx";
import { ActiveLink } from "../atoms/ActiveLink";

const MobileMenu = () => {
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

	return (
		<>
			<Menu
				className="relative md:hidden dark:text-white"
				size={30}
				onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
			/>

			{isMobileMenuOpen && (
				<ul
					className={clsx(
						isMobileMenuOpen && "right-0",
						!isMobileMenuOpen && "right-[-50px]",
						`absolute top-[54px] mt-4 flex flex-col rounded-bl-lg border border-gray-100 bg-white p-4 font-medium shadow-md md:hidden rtl:space-x-reverse dark:border-gray-900 dark:bg-gray-900`,
					)}
				>
					<div onClick={() => setIsMobileMenuOpen(false)}>
						<ActiveLink href={"/"}>Home</ActiveLink>
					</div>
					<div onClick={() => setIsMobileMenuOpen(false)}>
						<ActiveLink href={"/products"} exact={false}>
							All
						</ActiveLink>
					</div>
					<div onClick={() => setIsMobileMenuOpen(false)}>
						<ActiveLink href={"/categories"} exact={false}>
							Categories
						</ActiveLink>
					</div>
					<div onClick={() => setIsMobileMenuOpen(false)}>
						<ActiveLink href={"/collections"} exact={false}>
							Collections
						</ActiveLink>
					</div>
				</ul>
			)}
		</>
	);
};

export default MobileMenu;
