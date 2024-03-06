"use client";

import Link from "next/link";
import React, { type ReactNode } from "react";
import { clsx } from "clsx";
import { type Route } from "next";
import { usePathname } from "next/navigation";

type ActiveLinkProps = {
	activeClassName?: string;
	href: Route;
	children: ReactNode;
	exact?: boolean;
	className?: string;
};

export const ActiveLink = ({
	className,
	activeClassName,
	href,
	children,
	exact = true,
}: ActiveLinkProps) => {
	const pathName = usePathname();
	const isCurrentPath = exact ? pathName === href : pathName.startsWith(href as string);

	return (
		<li>
			{isCurrentPath ? (
				<Link
					href={href}
					className={clsx("transition-all", `${className}`, isCurrentPath && `${activeClassName}`)}
					aria-current={isCurrentPath}
				>
					{children}
				</Link>
			) : (
				<Link
					href={href}
					className={clsx("transition-all", `${className}`, isCurrentPath && `${activeClassName}`)}
				>
					{children}
				</Link>
			)}
		</li>
	);
};
