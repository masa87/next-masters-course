import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";

const inter = Inter({ subsets: ["latin"] });

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
		<html lang="pl">
			<body className={`${inter.className} bg-gray-100`}>
				<Navigation />
				<main className="container mx-auto min-h-[calc(100vh-52px)] px-4 pb-4 pt-20">
					{children}
				</main>
				<Footer />
			</body>
		</html>
	);
}
