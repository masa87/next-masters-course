type ProductResponseType = {
	id: string;
	title: string;
	price: number;
	description: string;
	category: string;
	image: string;
	longDescription: string;
};

const productResponseItemToProductType = (product: ProductResponseType) => {
	return {
		id: product.id,
		category: product.category,
		price: product.price,
		name: product.title,
		description: product.longDescription,
		coverImage: {
			src: product.image,
			alt: product.title,
		},
	};
};

export const getAllProducts = async () => {
	const res = await fetch("https://naszsklep-api.vercel.app/api/products");
	const productsResponse = (await res.json()) as ProductResponseType[];
	const products = productsResponse.map(productResponseItemToProductType);

	return products;
};

export const getProductById = async (productId: string) => {
	const res = await fetch(`https://naszsklep-api.vercel.app/api/products/${productId}`);
	const productResponse = (await res.json()) as ProductResponseType;

	const product = productResponseItemToProductType(productResponse);
	return product;
};

export const getOnlyXItems = async (itemsCount: number) => {
	const res = await fetch(`https://naszsklep-api.vercel.app/api/products?take=${itemsCount}`);
	const productsResponse = (await res.json()) as ProductResponseType[];
	const products = productsResponse.map(productResponseItemToProductType);

	return products;
};

export const getItemsWithOffset = async (itemsCount: number, offset: number) => {
	const res = await fetch(
		`https://naszsklep-api.vercel.app/api/products?take=${itemsCount}&offset=${offset}`,
	);
	const productsResponse = (await res.json()) as ProductResponseType[];
	const products = productsResponse.map(productResponseItemToProductType);

	return products;
};
