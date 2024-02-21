import { Suspense } from "react";
import Spinner from "../components/atoms/Spinner";

export default function ProductPageLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return <Suspense fallback={<Spinner />}>{children}</Suspense>;
}
