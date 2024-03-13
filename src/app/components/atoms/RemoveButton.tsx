"use client";

import React, { useTransition } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
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
			className="mr-2 cursor-pointer text-red-600 disabled:cursor-not-allowed disabled:text-slate-500"
		>
			<Image className="mx-2" src={"/icons/remove-icon.svg"} alt="x-icon" width={20} height={20} />
		</button>
	);
};

export default RemoveButton;
