"use client";

import { ChevronDown, ChevronUp } from "lucide-react";
import React, { useOptimistic } from "react";
import { useFormStatus } from "react-dom";
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
				type="submit"
				data-testid="increment"
				disabled={status.pending}
				className="min-h-6 cursor-pointer"
				formAction={async () => {
					setOptimisticQuantity(optimisticQuantity + 1);
					await changeItemQuantity(cartId, productId, optimisticQuantity + 1);
				}}
			>
				<ChevronUp />
			</button>
			<p
				className="w-full cursor-default rounded-md border-b-gray-100 bg-slate-200 text-center"
				data-testid="quantity"
			>
				{optimisticQuantity}
			</p>

			<button
				type="submit"
				data-testid="decrement"
				disabled={status.pending}
				className="min-h-6 cursor-pointer disabled:opacity-40"
				formAction={async () => {
					setOptimisticQuantity(optimisticQuantity - 1);
					await changeItemQuantity(cartId, productId, optimisticQuantity - 1);
				}}
			>
				<span>{optimisticQuantity > 1 && <ChevronDown />}</span>
			</button>
		</form>
	);
};

export default Counter;
