import React from "react";
import { ProductList } from "./ProductList";
import {
	CategoryGetProductsListDocument,
	CollectionGetProductsListDocument,
	type ProductItemFragmentFragment,
	ProductsGetListByCountItemsDocument,
} from "@/gql/graphql";
import { executeGraphql } from "@/app/api/graphqlApi";

type RelatedProductsListProsp = {
	categorySlug: string;
};

const RelatedProductsList = async ({ categorySlug }: RelatedProductsListProsp) => {
	let relatedProducts: ProductItemFragmentFragment[] = [];

	const getListByCollection = async () => {
		const products = await executeGraphql(CollectionGetProductsListDocument, {
			slug: categorySlug,
		});

		return products;
	};

	const getAllProducts = async () => {
		const products = await executeGraphql(ProductsGetListByCountItemsDocument, {
			countItems: 4,
			offset: 0,
		});
		return products;
	};

	await executeGraphql(CategoryGetProductsListDocument, {
		slug: categorySlug,
	}).then((res) => {
		if (res.category?.products) {
			relatedProducts = res.category?.products;
		}
	});

	if (relatedProducts.length > 0 && relatedProducts.length < 4) {
		await getListByCollection().then(async (res) => {
			if (res.collection?.products && res.collection.products.length > 0) {
				relatedProducts = [...relatedProducts, ...res.collection.products];
			}

			if (relatedProducts.length > 0 && relatedProducts.length < 4) {
				await getAllProducts().then((res) => {
					relatedProducts = [...relatedProducts, ...res.products.data];
				});
			}
		});
	}

	return (
		<ul
			className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4"
			data-testid="related-products"
		>
			<ProductList products={relatedProducts.slice(0, 4)} />
		</ul>
	);
};

export default RelatedProductsList;
