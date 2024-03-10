import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Navigation from "./components/organisms/Navigation";
import Footer from "./components/organisms/Footer";

const montseratt = Montserrat({ subsets: ["latin", "latin-ext"] });

export const metadata: Metadata = {
	title: "Best shop ever",
	description: "Shop created with NextMasters guys",
	icons: {
		icon: "/favicon.ico",
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<ClerkProvider>
			<html lang="pl">
				<body className={`${montseratt.className} bg-gray-100`}>
					<Navigation />
					<main className="container mx-auto min-h-[calc(100vh-52px)] px-4 pb-4 pt-20">
						{children}
					</main>
					<Footer />
				</body>
			</html>
		</ClerkProvider>
	);
}
