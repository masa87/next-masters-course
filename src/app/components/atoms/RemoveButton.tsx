"use client";

import { Trash2 } from "lucide-react";
import React, { useTransition } from "react";
import { useRouter } from "next/navigation";
import { removeItem } from "@/app/cart/actions";

const RemoveButton = ({ productId, cartId }: { productId: string; cartId: string }) => {
	const router = useRouter();
	const [isPending, startTransition] = useTransition();

	return (
		<button
			disabled={isPending}
			onClick={() => {
				startTransition(async () => {
					await removeItem(cartId, productId);
					router.refresh();
				});
			}}
			className="mr-2 cursor-pointer text-red-600"
		>
			<Trash2 size={20} />
		</button>
	);
};

export default RemoveButton;
