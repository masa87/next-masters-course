import { ProductList } from "./components/organisms/ProductList";

export default function Home() {
	const products = [
		{
			id: "1",
			category: "plecaki",
			price: 12000,
			coverImage: {
				src: "/picture_1.jpg",
				alt: "Plecak dzieciecy",
			},
		},
		{
			id: "2",
			category: "plecaki",
			price: 5567,
			coverImage: {
				src: "/picture_2.jpg",
				alt: "Plecak dzieciecy",
			},
		},
		{
			id: "3",
			category: "plecaki",
			price: 2340,
			coverImage: {
				src: "/picture_3.jpg",
				alt: "Plecak dzieciecy",
			},
		},
		{
			id: "4",
			category: "plecaki",
			price: 2345,
			coverImage: {
				src: "/picture_4.jpg",
				alt: "Plecak dzieciecy",
			},
		},
	];

	return (
		<section className="flex h-[100vh] items-center justify-center">
			<ProductList products={products} />
		</section>
	);
}
