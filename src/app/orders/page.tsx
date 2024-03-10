import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { executeGraphql } from "../api/graphqlApi";
import { OrdersGetByEmailDocument } from "@/gql/graphql";

export default async function OrdersPage() {
	const user = await currentUser();
	const email = user?.emailAddresses[0]?.emailAddress;

	if (!email) {
		redirect("/sign-in");
	}

	const orders = await executeGraphql({
		query: OrdersGetByEmailDocument,
		variables: {
			email,
		},
	});

	return (
		<ul>
			{orders.orders.data.map((order) => (
				<li key={order.id}>{order.id}</li>
			))}
		</ul>
	);
}
