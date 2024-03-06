import { cookies } from "next/headers";
import Image from "next/image";
import { XIcon } from "lucide-react";
import clsx from "clsx";
import { redirect } from "next/navigation";
import { executeGraphql } from "../api/graphqlApi";
import Counter from "../components/atoms/Counter";
import { formatPrice } from "../components/utils";
import RemoveButton from "../components/atoms/RemoveButton";
import { CartFindOrCreateMutationDocument } from "@/gql/graphql";

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

	if (!cartId || cartFindOrCreate.items.length === 0) {
		redirect("/");
	}

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
				<div className="text-xl font-semibold">
					Total:
					<span className="ml-2 font-bold text-blue-500">{formatPrice(getTotalPrice() / 100)}</span>
				</div>
			</div>

			<div className="container flex flex-col gap-4">
				{cartFindOrCreate?.items.map((product) => (
					<div
						key={product.product.id}
						className="flex justify-between rounded-md bg-white px-5 py-2 shadow-md"
					>
						<div className="flex">
							{product.product.images[0] && (
								<Image
									width={100}
									height={100}
									src={product.product.images[0].url}
									alt={product.product.name}
									className="h-30 rounded-md object-contain"
								/>
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
						<div className="flex items-center justify-between">
							<RemoveButton productId={product.product.id} cartId={cartId} />
							<Counter quantity={product.quantity} productId={product.product.id} cartId={cartId} />
							<XIcon className="mx-2" size={15} />
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
