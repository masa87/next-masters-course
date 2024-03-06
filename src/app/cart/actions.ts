"use server";

import { revalidateTag } from "next/cache";
import { executeGraphql } from "../api/graphqlApi";
import {
	CartAddItemMutationDocument,
	CartChangeItemQuantityDocument,
	CartFindOrCreateMutationDocument,
	CartRemoveItemDocument,
} from "@/gql/graphql";

export const changeItemQuantity = async (cartId: string, productId: string, quantity: number) => {
	const cart = executeGraphql({
		query: CartChangeItemQuantityDocument,
		variables: {
			id: cartId,
			quantity: quantity,
			productId: productId,
		},
		cache: "no-store",
	});
	revalidateTag("cart");

	return cart;
};

export const removeItem = async (cartId: string, productId: string) => {
	revalidateTag("cart");

	const cart = await executeGraphql({
		query: CartRemoveItemDocument,
		variables: {
			id: cartId,
			productId: productId,
		},
		cache: "no-store",
	});
	revalidateTag("cart");

	return cart;
};

export async function getCartById(cartId: string) {
	return executeGraphql({
		query: CartFindOrCreateMutationDocument,
		variables: {
			id: cartId,
		},
		cache: "no-store",
	});
}
export async function addToCart(id: string, productId: string) {
	const cart = await executeGraphql({
		query: CartAddItemMutationDocument,
		variables: {
			id: id,
			input: {
				item: {
					productId: productId,
				},
			},
		},
		cache: "no-store",
	});

	revalidateTag("cart");

	return cart;
}

export async function createCart() {
	const cart = await executeGraphql({
		query: CartFindOrCreateMutationDocument,
		variables: {},
		cache: "no-store",
	});

	return cart;
}
