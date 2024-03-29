import React from "react";
import Link from "next/link";
import { cookies } from "next/headers";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import { ActiveLink } from "../atoms/ActiveLink";
import MobileMenu from "../molecules/MobileMenu";
import SearchInput from "../atoms/SearchInput";
import { executeGraphql } from "@/app/api/graphqlApi";
import { CartFindOrCreateMutationDocument, CategoriesGetListDocument } from "@/gql/graphql";

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

	const { categories } = await executeGraphql({
		query: CategoriesGetListDocument,
		variables: {
			countItems: 8,
			offset: 0,
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
								<Image src="/icons/cart.svg" alt={"cart"} width={24} height={24} />
								<p className="self-start font-semibold text-blue-600">{cartItemsCount}</p>
							</div>
						</Link>
						<div>
							<SignedIn>
								<UserButton />
							</SignedIn>
						</div>
						<MobileMenu />
						<div className="hidden md:flex">
							<SignedOut>
								<div className="rounded-md bg-blue-600 px-4 py-2 font-semibold text-white transition hover:bg-blue-600 disabled:cursor-not-allowed disabled:bg-blue-400">
									<SignInButton />
								</div>
							</SignedOut>
						</div>
					</div>
				</div>
				<div className="hidden w-full items-center justify-between md:order-1 md:flex md:w-auto">
					<ul className="mt-4 flex flex-col rounded-lg border border-gray-100 bg-gray-50 p-4 font-medium md:mt-0 md:flex-row md:space-x-8 md:border-0 md:bg-white md:p-0 rtl:space-x-reverse">
						<ActiveLink href={"/"}>Home</ActiveLink>
						<ActiveLink href={"/products"} exact={false}>
							All
						</ActiveLink>
						{categories.data.map((category) => (
							<ActiveLink exact={false} key={category.id} href={`/categories/${category.slug}/1`}>
								{category.name}
							</ActiveLink>
						))}
					</ul>
				</div>
			</div>
		</nav>
	);
};

export default Navigation;
