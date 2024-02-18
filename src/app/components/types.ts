export type ProductType = {
	id: string;
	category: string;
	price: number;
	name: string;
	description: string;
	coverImage: {
		src: string;
		alt: string;
	};
};
