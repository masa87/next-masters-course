import { redirect } from "next/navigation";
import Stripe from "stripe";
import Image from "next/image";

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
				{stripeCheckoutSession.payment_status === "paid" && (
					<Image
						src={"/icons/chevron-up.svg"}
						alt="x-icon"
						width={40}
						height={40}
						className="rotate-180"
					/>
				)}
				<h2 className="mb-4 text-2xl font-bold">
					Payment status: {stripeCheckoutSession.payment_status}
				</h2>
			</div>
		</div>
	);
}
