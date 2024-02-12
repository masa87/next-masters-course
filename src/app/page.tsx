import { ProductList } from "./components/organisms/ProductList";

export default function Home() {
	const products = [
		{
			id: "1",
			category: "plecaki",
			price: 12000,
			name: "Plecak",
			coverImage: {
				src: "/picture_1.jpg",
				alt: "Plecak dzieciecy",
			},
		},
		{
			id: "2",
			category: "plecaki",
			price: 5567,
			name: "Torba",
			coverImage: {
				src: "/picture_2.jpg",
				alt: "Plecak dzieciecy",
			},
		},
		{
			id: "3",
			name: "czarny plecak",
			category: "plecaki",
			price: 2340,
			coverImage: {
				src: "/picture_3.jpg",
				alt: "Plecak dzieciecy",
			},
		},
		{
			id: "4",
			name: "Buty",
			category: "plecaki",
			price: 2345,
			coverImage: {
				src: "/picture_4.jpg",
				alt: "Plecak dzieciecy",
			},
		},
		{
			id: "1",
			category: "plecaki",
			price: 12000,
			name: "Plecak",
			coverImage: {
				src: "/picture_1.jpg",
				alt: "Plecak dzieciecy",
			},
		},
		{
			id: "2",
			category: "plecaki",
			price: 5567,
			name: "Torba",
			coverImage: {
				src: "/picture_2.jpg",
				alt: "Plecak dzieciecy",
			},
		},
		{
			id: "3",
			name: "czarny plecak",
			category: "plecaki",
			price: 2340,
			coverImage: {
				src: "/picture_3.jpg",
				alt: "Plecak dzieciecy",
			},
		},
		{
			id: "4",
			name: "Buty",
			category: "plecaki",
			price: 2345,
			coverImage: {
				src: "/picture_4.jpg",
				alt: "Plecak dzieciecy",
			},
		},
	];

	return (
		<section className="container mx-auto py-8">
			<ProductList products={products} />
		</section>
	);
}
