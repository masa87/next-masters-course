import { ProductList } from "@/app/components/organisms/ProductList";
import { getAllProducts } from "@/app/api/getAllProducts";

export const generateStaticParams = async () => {
	const products = await getAllProducts();
	return products;
};

export default async function ProductsPage() {
	const products = await getAllProducts();

	return (
		<ul
			className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4"
			data-testid="products-list"
		>
			<ProductList products={products} />
		</ul>
	);
}
