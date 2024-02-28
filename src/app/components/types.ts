export type ProductType = {
	id: string;
	category: {
		name: string;
	};
	price: number;
	name: string;
	description: string;
	coverImage: {
		src: string;
		alt: string;
	};
};
