import { cookies } from "next/headers";
import Image from "next/image";
import clsx from "clsx";
import { redirect } from "next/navigation";
import { type Metadata } from "next";
import Link from "next/link";
import { executeGraphql } from "../api/graphqlApi";
import Counter from "../components/atoms/Counter";
import { formatPrice } from "../components/utils";
import RemoveButton from "../components/atoms/RemoveButton";
import { handlePaymentAction } from "./actions";
import { CartFindOrCreateMutationDocument } from "@/gql/graphql";

export async function generateMetadata(): Promise<Metadata> {
	const cartId = cookies().get("cartId")?.value;

	return {
		title: "cart",
		description: `Your cart -> id=${cartId}`,
	};
}

export default async function CartPage() {
	const cartId = cookies().get("cartId")?.value;
	const { cartFindOrCreate } = await executeGraphql({
		query: CartFindOrCreateMutationDocument,
		variables: {
			id: cartId,
		},
		next: {
			tags: ["cart"],
		},
		cache: "no-store",
	});


	const getTotalPrice = () => {
		let total = 0;
		cartFindOrCreate.items.map(({ product, quantity }) => {
			total += product.price * quantity;
		});
		return total;
	};

	return (
		<div className="mt-6">
			<div className="flex items-center justify-between">
				<h2 className="mb-4 text-2xl font-bold">Products:</h2>
				<form className="mb-5 flex justify-end" action={handlePaymentAction}>
					<button
						type="submit"
						className="rounded-md bg-blue-600 px-4 py-2 font-semibold text-white transition hover:bg-blue-600 disabled:cursor-not-allowed disabled:bg-blue-400"
					>
						Pay {formatPrice(getTotalPrice() / 100)}
					</button>
				</form>
			</div>

			<div className="container flex flex-col gap-4">
				{cartFindOrCreate?.items.map((product) => (
					<div
						key={product.product.id}
						className="flex flex-col justify-between rounded-md bg-white px-5 py-2 shadow-md sm:flex-row"
					>
						<div className="flex">
							{product.product.images[0] && (
								<Link href={`/product/${product.product.id}`}>
									<Image
										width={100}
										height={100}
										src={product.product.images[0].url}
										alt={product.product.name}
										className="h-30 rounded-md object-contain"
									/>
								</Link>
							)}
							<div className="mb-2 ml-5 flex items-center justify-between">
								<div>
									<p className="text-lg font-semibold">{product.product.name}</p>
									{product.product.categories && (
										<p className="text-sm italic">{product.product.categories[0]?.name}</p>
									)}
								</div>
							</div>
						</div>
						<div className="flex items-center justify-center sm:justify-between">
							<RemoveButton productId={product.product.id} cartId={cartId} />
							<Counter quantity={product.quantity} productId={product.product.id} cartId={cartId} />
							<Image
								className="mx-2"
								src={"/icons/x-icon.svg"}
								alt="x-icon"
								width={15}
								height={15}
							/>
							<div className={clsx(`self-center`, product.quantity > 1 && "mt-[33px]")}>
								<p className="font-semibold">{formatPrice(product.product.price / 100)}</p>
								{product.quantity > 1 && (
									<p className="mt-2 border-t italic">
										{formatPrice((product.product.price / 100) * product.quantity)}
									</p>
								)}
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
