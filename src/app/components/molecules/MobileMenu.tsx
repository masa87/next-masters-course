"use client";

import React, { useState } from "react";
import { Menu } from "lucide-react";
import clsx from "clsx";
import { SignInButton, SignedOut } from "@clerk/nextjs";
import { ActiveLink } from "../atoms/ActiveLink";

const MobileMenu = () => {
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

	const handleClose = () => {
		setIsMobileMenuOpen(false);
	};

	return (
		<>
			<Menu
				className="relative md:hidden"
				size={30}
				onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
			/>

			{isMobileMenuOpen && (
				<ul
					className={clsx(
						isMobileMenuOpen && "right-0",
						!isMobileMenuOpen && "right-[-50px]",
						`absolute top-[54px] mt-4 flex flex-col rounded-bl-lg border border-gray-100 bg-white p-4 font-medium shadow-md md:hidden rtl:space-x-reverse`,
					)}
				>
					<div onClick={handleClose}>
						<ActiveLink href={"/"}>Home</ActiveLink>
					</div>
					<div onClick={handleClose}>
						<ActiveLink href={"/products"} exact={false}>
							All
						</ActiveLink>
					</div>
					<div onClick={handleClose}>
						<ActiveLink href={"/categories"} exact={false}>
							Categories
						</ActiveLink>
					</div>
					<div onClick={handleClose}>
						<ActiveLink href={"/collections"} exact={false}>
							Collections
						</ActiveLink>
					</div>
					<SignedOut>
						<div
							onClick={handleClose}
							className="rounded-md bg-blue-600 px-4 py-2 text-center font-semibold text-white transition hover:bg-blue-600 disabled:cursor-not-allowed disabled:bg-blue-400"
						>
							<SignInButton />
						</div>
					</SignedOut>
				</ul>
			)}
		</>
	);
};

export default MobileMenu;
