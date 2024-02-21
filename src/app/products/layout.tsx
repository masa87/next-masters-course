import { Suspense } from "react";
import Spinner from "../components/atoms/Spinner";

export default function ProductsPageLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return <Suspense fallback={<Spinner />}>{children}</Suspense>;
}
