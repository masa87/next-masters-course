import React from "react";
import { Menu, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { cookies } from "next/headers";
import { ActiveLink } from "../atoms/ActiveLink";
import SearchInput from "../atoms/SearchInput";
import { executeGraphql } from "@/app/api/graphqlApi";
import { CartFindOrCreateMutationDocument } from "@/gql/graphql";

const Navigation = async () => {
	const cartId = cookies().get("cartId")?.value;
	const { cartFindOrCreate } = await executeGraphql({
		query: CartFindOrCreateMutationDocument,
		variables: {
			id: cartId,
		},
		next: {
			tags: ["cart"],
		},
	});

	const cartItemsCount = cartFindOrCreate.items.length || 0;

	return (
		<nav className="fixed z-50 w-full border-gray-200 bg-white shadow-sm dark:bg-gray-900">
			<div className="container mx-auto flex flex-wrap items-center justify-between p-4">
				<div className="flex md:order-2">
					<SearchInput />

					<Link href={"/cart"}>
						<div className="ml-4 flex h-9 items-center justify-center gap-1 dark:text-white">
							<ShoppingCart />
							<p className="self-start font-semibold text-blue-500">{cartItemsCount}</p>
						</div>
					</Link>
					<button
						data-collapse-toggle="navbar-search"
						type="button"
						className="inline-flex h-10 w-10 items-center justify-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 md:hidden dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
						aria-controls="navbar-search"
						aria-expanded="false"
					>
						<span className="sr-only">Open main menu</span>
						<Menu size={40} />
					</button>
				</div>
				<div
					className="hidden w-full items-center justify-between md:order-1 md:flex md:w-auto"
					id="navbar-search"
				>
					<div className="relative mt-3 md:hidden">
						<div className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3">
							{/* <svg
								className="h-4 w-4 text-gray-500 dark:text-gray-400"
								aria-hidden="true"
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 20 20"
							>
								<path
									stroke="currentColor"
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
								/>
							</svg> */}
						</div>
						<input
							type="text"
							id="search-navbar-mobile"
							className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2 ps-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 focus-visible:border-blue-500
            dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
							placeholder="Search..."
						/>
					</div>
					<ul className="mt-4 flex flex-col rounded-lg border border-gray-100 bg-gray-50 p-4 font-medium md:mt-0 md:flex-row md:space-x-8 md:border-0 md:bg-white md:p-0 rtl:space-x-reverse dark:border-gray-700 dark:bg-gray-800 md:dark:bg-gray-900">
						<ActiveLink href={"/"}>Home</ActiveLink>
						<ActiveLink href={"/products"} exact={false}>
							All
						</ActiveLink>
						<ActiveLink href={"/categories"} exact={false}>
							Categories
						</ActiveLink>
						<ActiveLink href={"/collections"} exact={false}>
							Collections
						</ActiveLink>
					</ul>
				</div>
			</div>
		</nav>
	);
};

export default Navigation;
