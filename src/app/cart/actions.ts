"use server";

import { revalidateTag } from "next/cache";
import Stripe from "stripe";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { executeGraphql } from "../api/graphqlApi";
import {
	CartAddItemMutationDocument,
	CartChangeItemQuantityDocument,
	CartFindOrCreateMutationDocument,
	CartRemoveItemDocument,
} from "@/gql/graphql";

export const getCartFromCookies = async () => {
	const cartId = cookies().get("cartId")?.value;
	return cartId;
};

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

export async function getCartById() {
	const cartId = cookies().get("cartId")?.value;

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

export const handlePaymentAction = async () => {
	"use server";

	const { cartFindOrCreate } = await getCartById();

	if (!cartFindOrCreate) {
		return;
	}

	if (!process.env.STRIPE_SECRET_KEY) {
		throw new Error("Missing STRIPE_SECRET_KEY");
	}

	const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
		apiVersion: "2023-10-16",
		typescript: true,
	});

	const checkoutSession = await stripe.checkout.sessions.create({
		payment_method_types: ["card", "p24"],
		metadata: {
			cartId: cartFindOrCreate.id,
		},
		line_items: cartFindOrCreate.items.map(({ product, quantity }) => {
			return {
				price_data: {
					currency: "eur",
					product_data: {
						name: product.name,
						description: product.description,
						images: product.images.map(({ url }) => url),
					},
					unit_amount: product.price * quantity,
				},
				quantity,
			};
		}),
		mode: "payment",
		success_url: `${process.env.HOST_URL}/cart/success?sessionId={CHECKOUT_SESSION_ID}`,
		cancel_url: `${process.env.HOST_URL}/cart/cancel`,
	});

	if (!checkoutSession.url) {
		throw new Error("Could not create checkout session");
	}

	cookies().set("cartId", "");
	redirect(checkoutSession.url);
};
