"use client";

import Link from "next/link";
import React, { type ReactNode } from "react";
import { clsx } from "clsx";
import { type Route } from "next";
import { usePathname } from "next/navigation";

type ActiveLinkProps = {
	href: Route;
	children: ReactNode;
	exact?: boolean;
	className?: string;
};

export const ActiveLink = ({ className, href, children, exact = true }: ActiveLinkProps) => {
	const pathName = usePathname();
	const isCurrentPath = exact ? pathName === href : pathName.startsWith(href as string);

	return (
		<li>
			{isCurrentPath ? (
				<Link
					href={href}
					className={clsx(
						"block px-3  py-2 text-gray-900 transition-all hover:bg-gray-100 md:p-0 md:hover:bg-transparent md:hover:text-blue-700",
						`${className}`,
						isCurrentPath && `border-b-2 border-b-blue-500`,
					)}
					aria-current={isCurrentPath}
				>
					{children}
				</Link>
			) : (
				<Link
					href={href}
					className={clsx(
						"block px-3  py-2 text-gray-900 transition-all hover:bg-gray-100 md:p-0 md:hover:bg-transparent md:hover:text-blue-700",
						`${className}`,
					)}
				>
					{children}
				</Link>
			)}
		</li>
	);
};
