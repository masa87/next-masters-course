/// <reference types="stripe-event-types" />
import { type NextRequest } from "next/server";
import Stripe from "stripe";
import { executeGraphql } from "../../graphqlApi";
import { CartStatusChangeDocument } from "@/gql/graphql";

export async function POST(request: NextRequest): Promise<Response> {
	if (!process.env.STRIPE_SECRET_KEY) {
		throw new Error("Missing STRIPE_SECRET_KEY");
	}

	if (!process.env.STRIPE_WEBHOOK_SECRET) {
		throw new Error("Missing STRIPE_WEBHOOK_SECRET");
	}

	const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
		apiVersion: "2023-10-16",
		typescript: true,
	});

	const signature = request.headers.get("stripe-signature");

	if (!signature) {
		return new Response("No signature", { status: 401 });
	}

	const event = stripe.webhooks.constructEvent(
		await request.text(),
		signature,
		process.env.STRIPE_WEBHOOK_SECRET,
	) as Stripe.DiscriminatedEvent;

	event.type;

	switch (event.type) {
		case "checkout.session.completed": {
			const cartId = event.data.object.metadata?.cartId;
			const userEmail = event.data.object.customer_email;

			if (cartId && userEmail) {
				await executeGraphql({
					query: CartStatusChangeDocument,
					variables: {
						cartId: cartId,
						userEmail: userEmail,
					},
				});
			}
		}
	}

	return new Response("OK", { status: 204 });
}
