import { Suspense } from "react";
import Spinner from "@/app/components/atoms/Spinner";

export default function ProductLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return <Suspense fallback={<Spinner />}>{children}</Suspense>;
}
