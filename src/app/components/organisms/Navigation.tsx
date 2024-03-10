import React from "react";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import { cookies } from "next/headers";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { ActiveLink } from "../atoms/ActiveLink";
import SearchInput from "../atoms/SearchInput";
import MobileMenu from "../molecules/MobileMenu";
import CustomButton from "../atoms/CustomButton";
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
		<nav className="fixed z-50 w-full border-gray-200 bg-white shadow-sm">
			<div className="container mx-auto flex flex-wrap items-center justify-between p-4">
				<div className="flex w-full items-center justify-between md:order-2 md:w-auto">
					<SearchInput />

					<div className="flex items-center gap-3">
						<Link href={"/cart"}>
							<div className="ml-4 flex h-9 items-center justify-center gap-1">
								<ShoppingCart />
								<p className="self-start font-semibold text-blue-500">{cartItemsCount}</p>
							</div>
						</Link>
						<MobileMenu />

						<SignedOut>
							<CustomButton>
								<SignInButton />
							</CustomButton>
						</SignedOut>
						<div>
							<SignedIn>
								<UserButton />
							</SignedIn>
						</div>
					</div>
				</div>
				<div className="hidden w-full items-center justify-between md:order-1 md:flex md:w-auto">
					<ul className="mt-4 flex flex-col rounded-lg border border-gray-100 bg-gray-50 p-4 font-medium md:mt-0 md:flex-row md:space-x-8 md:border-0 md:bg-white md:p-0 rtl:space-x-reverse">
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
