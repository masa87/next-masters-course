import { CheckCircle } from "lucide-react";
import { redirect } from "next/navigation";
import Stripe from "stripe";

export default async function CartSuccess({
	searchParams,
}: {
	searchParams: { sessionId: string };
}) {
	if (!searchParams.sessionId) {
		redirect("/");
	}

	if (!process.env.STRIPE_SECRET_KEY) {
		return null;
	}

	const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
		apiVersion: "2023-10-16",
		typescript: true,
	});

	const stripeCheckoutSession = await stripe.checkout.sessions.retrieve(searchParams.sessionId);

	return (
		<div className="container mx-auto my-8 flex justify-center">
			<div className="flex max-w-96 flex-col items-center gap-5 rounded-md bg-white p-8 shadow-md">
				{stripeCheckoutSession.payment_status === "paid" && <CheckCircle color="green" size={40} />}
				<h2 className="mb-4 text-2xl font-bold">
					Payment status: {stripeCheckoutSession.payment_status}
				</h2>
			</div>
		</div>
	);
}
