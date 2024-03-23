"use client";

import React, { useOptimistic } from "react";
import { useFormStatus } from "react-dom";
import Image from "next/image";
import { changeItemQuantity } from "@/app/cart/actions";

type CounterProps = {
	quantity: number;
	productId: string;
	cartId: string;
};

const Counter = ({ quantity, productId, cartId }: CounterProps) => {
	const [optimisticQuantity, setOptimisticQuantity] = useOptimistic(
		quantity,
		(_state, newQuantity: number) => newQuantity,
	);
	const status = useFormStatus();

	return (
		<form className="flex w-16 flex-col items-center">
			<button
				data-testid="increment"
				disabled={status.pending}
				className="min-h-6 cursor-pointer"
				formAction={async () => {
					setOptimisticQuantity(optimisticQuantity + 1);
					await changeItemQuantity(cartId, productId, optimisticQuantity + 1);
				}}
			>
				<Image src={"/icons/chevron-up.svg"} alt="x-icon" width={24} height={24} />
			</button>
			<p
				className="w-full cursor-default rounded-md border-b-gray-100 bg-slate-200 text-center"
				data-testid="quantity"
			>
				{optimisticQuantity}
			</p>

			<button
				data-testid="decrement"
				disabled={status.pending}
				className="min-h-6 cursor-pointer disabled:opacity-40"
				formAction={async () => {
					setOptimisticQuantity(optimisticQuantity - 1);
					await changeItemQuantity(cartId, productId, optimisticQuantity - 1);
				}}
			>
				<span>
					{optimisticQuantity > 1 && (
						<Image
							src={"/icons/chevron-up.svg"}
							alt="x-icon"
							width={24}
							height={24}
							className="rotate-180"
						/>
					)}
				</span>
			</button>
		</form>
	);
};

export default Counter;
