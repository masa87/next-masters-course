/* eslint-disable */
import { DocumentTypeDecoration } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  DateTime: { input: unknown; output: unknown; }
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: { input: unknown; output: unknown; }
};

export type Cart = {
  id: Scalars['ID']['output'];
  items: Array<CartItem>;
};

export type CartItem = {
  product: Product;
  quantity: Scalars['Int']['output'];
};

export type CartItemInput = {
  productId: Scalars['String']['input'];
  quantity?: InputMaybe<Scalars['Int']['input']>;
};

export type Category = {
  description: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  products: Array<Product>;
  slug: Scalars['String']['output'];
};

export type CategoryList = {
  data: Array<Category>;
  meta: ListMeta;
};

export type Collection = {
  description: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  products: Array<Product>;
  slug: Scalars['String']['output'];
};

export type CollectionList = {
  data: Array<Collection>;
  meta: ListMeta;
};

export type ListMeta = {
  /** The total number of items matching the query */
  count: Scalars['Int']['output'];
  /** The total number of items in the database */
  total: Scalars['Int']['output'];
};

export type Mutation = {
  cartAddItem: Cart;
  cartChangeItemQuantity: Cart;
  cartComplete: Order;
  cartFindOrCreate: Cart;
  cartRemoveItem: Cart;
  reviewCreate: Cart;
};


export type MutationCartAddItemArgs = {
  id: Scalars['ID']['input'];
  input: MutationCartAddItemInput;
};


export type MutationCartChangeItemQuantityArgs = {
  id: Scalars['ID']['input'];
  productId: Scalars['ID']['input'];
  quantity: Scalars['Int']['input'];
};


export type MutationCartCompleteArgs = {
  cartId: Scalars['ID']['input'];
  userEmail: Scalars['String']['input'];
};


export type MutationCartFindOrCreateArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
  input: MutationCartFindOrCreateInput;
};


export type MutationCartRemoveItemArgs = {
  id: Scalars['ID']['input'];
  productId: Scalars['ID']['input'];
};


export type MutationReviewCreateArgs = {
  author: Scalars['String']['input'];
  description: Scalars['String']['input'];
  email: Scalars['String']['input'];
  productId: Scalars['ID']['input'];
  rating: Scalars['Int']['input'];
  title: Scalars['String']['input'];
};

export type MutationCartAddItemInput = {
  item: CartItemInput;
};

export type MutationCartFindOrCreateInput = {
  items?: InputMaybe<Array<CartItemInput>>;
};

export type Order = {
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  lines: Scalars['JSON']['output'];
  status: OrderStatus;
  totalAmount: Scalars['Int']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type OrderList = {
  data: Array<Order>;
  meta: ListMeta;
};

export type OrderSortBy =
  | 'DEFAULT'
  | 'STATUS'
  | 'TOTAL';

export type OrderStatus =
  | 'CANCELLED'
  | 'CREATED'
  | 'FULFILLED'
  | 'PAID';

export type Product = {
  categories: Array<Category>;
  collections: Array<Collection>;
  description: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  images: Array<ProductImage>;
  name: Scalars['String']['output'];
  price: Scalars['Int']['output'];
  rating?: Maybe<Scalars['Float']['output']>;
  reviews: Array<Review>;
  slug: Scalars['String']['output'];
};

export type ProductImage = {
  alt: Scalars['String']['output'];
  height: Scalars['Int']['output'];
  id: Scalars['ID']['output'];
  url: Scalars['String']['output'];
  width: Scalars['Int']['output'];
};

export type ProductList = {
  data: Array<Product>;
  meta: ListMeta;
};

export type ProductSortBy =
  | 'DEFAULT'
  | 'NAME'
  | 'PRICE'
  | 'RATING';

export type Query = {
  cart?: Maybe<Cart>;
  categories: CategoryList;
  category?: Maybe<Category>;
  collection?: Maybe<Collection>;
  collections: CollectionList;
  order?: Maybe<Order>;
  orders: OrderList;
  product?: Maybe<Product>;
  products: ProductList;
};


export type QueryCartArgs = {
  id: Scalars['ID']['input'];
};


export type QueryCategoriesArgs = {
  skip?: Scalars['Int']['input'];
  take?: Scalars['Int']['input'];
};


export type QueryCategoryArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
};


export type QueryCollectionArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
};


export type QueryCollectionsArgs = {
  skip?: Scalars['Int']['input'];
  take?: Scalars['Int']['input'];
};


export type QueryOrderArgs = {
  id: Scalars['ID']['input'];
};


export type QueryOrdersArgs = {
  email: Scalars['String']['input'];
  order?: SortDirection;
  orderBy?: OrderSortBy;
  skip?: Scalars['Int']['input'];
  take?: Scalars['Int']['input'];
};


export type QueryProductArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
};


export type QueryProductsArgs = {
  order?: SortDirection;
  orderBy?: ProductSortBy;
  search?: InputMaybe<Scalars['String']['input']>;
  skip?: Scalars['Int']['input'];
  take?: Scalars['Int']['input'];
};

export type Review = {
  author: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  description: Scalars['String']['output'];
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  product: Product;
  rating: Scalars['Float']['output'];
  title: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type ReviewList = {
  data: Array<Review>;
  meta: ListMeta;
};

export type SortDirection =
  | 'ASC'
  | 'DESC';

export type CartAddItemMutationMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  input: MutationCartAddItemInput;
}>;


export type CartAddItemMutationMutation = { cartAddItem: { id: string, items: Array<{ quantity: number, product: { id: string, name: string, description: string, price: number, images: Array<{ url: string }> } }> } };

export type CartChangeItemQuantityMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  productId: Scalars['ID']['input'];
  quantity: Scalars['Int']['input'];
}>;


export type CartChangeItemQuantityMutation = { cartChangeItemQuantity: { id: string, items: Array<{ quantity: number, product: { id: string, name: string, description: string, price: number, images: Array<{ url: string }> } }> } };

export type CartFindOrCreateMutationMutationVariables = Exact<{
  id?: InputMaybe<Scalars['ID']['input']>;
  input?: InputMaybe<MutationCartFindOrCreateInput>;
}>;


export type CartFindOrCreateMutationMutation = { cartFindOrCreate: { id: string, items: Array<{ quantity: number, product: { id: string, name: string, description: string, price: number, categories: Array<{ name: string }>, images: Array<{ url: string }> } }> } };

export type CartRemoveItemMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  productId: Scalars['ID']['input'];
}>;


export type CartRemoveItemMutation = { cartRemoveItem: { id: string, items: Array<{ quantity: number, product: { id: string, name: string, description: string, price: number, categories: Array<{ name: string }>, images: Array<{ url: string }> } }> } };

export type CartStatusChangeMutationVariables = Exact<{
  cartId: Scalars['ID']['input'];
  userEmail: Scalars['String']['input'];
}>;


export type CartStatusChangeMutation = { cartComplete: { id: string, totalAmount: number, lines: unknown, status: OrderStatus } };

export type CategoriesGetListQueryVariables = Exact<{
  countItems: Scalars['Int']['input'];
  offset: Scalars['Int']['input'];
}>;


export type CategoriesGetListQuery = { categories: { data: Array<{ id: string, name: string, slug: string, description: string, products: Array<{ images: Array<{ url: string }> }> }>, meta: { count: number, total: number } } };

export type CategoryGetProductsListQueryVariables = Exact<{
  slug: Scalars['String']['input'];
}>;


export type CategoryGetProductsListQuery = { category?: { products: Array<{ id: string, name: string, description: string, slug: string, price: number, categories: Array<{ name: string, slug: string }>, collections: Array<{ name: string, slug: string }>, images: Array<{ url: string, alt: string, height: number, width: number }>, reviews: Array<{ id: string, title: string, description: string, rating: number, email: string, author: string, updatedAt: unknown }> }> } | null };

export type CollectionGetProductsListQueryVariables = Exact<{
  slug: Scalars['String']['input'];
}>;


export type CollectionGetProductsListQuery = { collection?: { products: Array<{ id: string, name: string, description: string, slug: string, price: number, categories: Array<{ name: string, slug: string }>, collections: Array<{ name: string, slug: string }>, images: Array<{ url: string, alt: string, height: number, width: number }> }> } | null };

export type CollectionsGetListQueryVariables = Exact<{
  countItems: Scalars['Int']['input'];
  offset: Scalars['Int']['input'];
}>;


export type CollectionsGetListQuery = { collections: { data: Array<{ id: string, name: string, description: string, slug: string, products: Array<{ images: Array<{ url: string }> }> }>, meta: { count: number, total: number } } };

export type OrdersGetByEmailQueryVariables = Exact<{
  email: Scalars['String']['input'];
  order?: SortDirection;
  orderBy?: OrderSortBy;
  skip?: Scalars['Int']['input'];
  take?: Scalars['Int']['input'];
}>;


export type OrdersGetByEmailQuery = { orders: { data: Array<{ id: string, status: OrderStatus, totalAmount: number, createdAt: unknown, lines: unknown }>, meta: { total: number, count: number } } };

export type ProductGetItemByIdQueryVariables = Exact<{
  productId: Scalars['ID']['input'];
}>;


export type ProductGetItemByIdQuery = { product?: { description: string, id: string, name: string, price: number, rating?: number | null, slug: string, reviews: Array<{ id: string, title: string, description: string, rating: number, email: string, author: string, updatedAt: unknown }>, categories: Array<{ name: string, slug: string }>, collections: Array<{ name: string, slug: string }>, images: Array<{ alt: string, height: number, url: string, width: number }> } | null };

export type ProductItemFragmentFragment = { description: string, id: string, name: string, price: number, rating?: number | null, slug: string, categories: Array<{ name: string, slug: string }>, collections: Array<{ name: string, slug: string }>, images: Array<{ alt: string, height: number, url: string, width: number }> };

export type ProductsGetListQueryVariables = Exact<{ [key: string]: never; }>;


export type ProductsGetListQuery = { products: { data: Array<{ description: string, id: string, name: string, price: number, rating?: number | null, slug: string, categories: Array<{ name: string, slug: string }>, collections: Array<{ name: string, slug: string }>, images: Array<{ alt: string, height: number, url: string, width: number }> }>, meta: { count: number, total: number } } };

export type ProductsGetListByCountItemsQueryVariables = Exact<{
  countItems: Scalars['Int']['input'];
  offset: Scalars['Int']['input'];
}>;


export type ProductsGetListByCountItemsQuery = { products: { data: Array<{ description: string, id: string, name: string, price: number, rating?: number | null, slug: string, categories: Array<{ name: string, slug: string }>, collections: Array<{ name: string, slug: string }>, images: Array<{ alt: string, height: number, url: string, width: number }> }>, meta: { count: number, total: number } } };

export type ProductsSearchByWordQueryVariables = Exact<{
  searchBy: Scalars['String']['input'];
}>;


export type ProductsSearchByWordQuery = { products: { data: Array<{ description: string, id: string, name: string, price: number, rating?: number | null, slug: string, categories: Array<{ name: string, slug: string }>, collections: Array<{ name: string, slug: string }>, images: Array<{ alt: string, height: number, url: string, width: number }> }>, meta: { count: number, total: number } } };

export type ReviewCreateMutationVariables = Exact<{
  author: Scalars['String']['input'];
  description: Scalars['String']['input'];
  email: Scalars['String']['input'];
  productId: Scalars['ID']['input'];
  rating: Scalars['Int']['input'];
  title: Scalars['String']['input'];
}>;


export type ReviewCreateMutation = { reviewCreate: { id: string, items: Array<{ quantity: number, product: { id: string, name: string } }> } };

export class TypedDocumentString<TResult, TVariables>
  extends String
  implements DocumentTypeDecoration<TResult, TVariables>
{
  __apiType?: DocumentTypeDecoration<TResult, TVariables>['__apiType'];

  constructor(private value: string, public __meta__?: Record<string, any>) {
    super(value);
  }

  toString(): string & DocumentTypeDecoration<TResult, TVariables> {
    return this.value;
  }
}
export const ProductItemFragmentFragmentDoc = new TypedDocumentString(`
    fragment ProductItemFragment on Product {
  description
  id
  name
  price
  rating
  slug
  categories {
    name
    slug
  }
  collections {
    name
    slug
  }
  images {
    alt
    height
    url
    width
  }
}
    `, {"fragmentName":"ProductItemFragment"}) as unknown as TypedDocumentString<ProductItemFragmentFragment, unknown>;
export const CartAddItemMutationDocument = new TypedDocumentString(`
    mutation CartAddItemMutation($id: ID!, $input: MutationCartAddItemInput!) {
  cartAddItem(id: $id, input: $input) {
    id
    items {
      quantity
      product {
        id
        name
        description
        price
        images {
          url
        }
      }
    }
  }
}
    `) as unknown as TypedDocumentString<CartAddItemMutationMutation, CartAddItemMutationMutationVariables>;
export const CartChangeItemQuantityDocument = new TypedDocumentString(`
    mutation CartChangeItemQuantity($id: ID!, $productId: ID!, $quantity: Int!) {
  cartChangeItemQuantity(id: $id, productId: $productId, quantity: $quantity) {
    id
    items {
      quantity
      product {
        id
        name
        description
        price
        images {
          url
        }
      }
    }
  }
}
    `) as unknown as TypedDocumentString<CartChangeItemQuantityMutation, CartChangeItemQuantityMutationVariables>;
export const CartFindOrCreateMutationDocument = new TypedDocumentString(`
    mutation CartFindOrCreateMutation($id: ID, $input: MutationCartFindOrCreateInput = {}) {
  cartFindOrCreate(id: $id, input: $input) {
    id
    items {
      quantity
      product {
        id
        name
        description
        price
        categories {
          name
        }
        images {
          url
        }
      }
    }
  }
}
    `) as unknown as TypedDocumentString<CartFindOrCreateMutationMutation, CartFindOrCreateMutationMutationVariables>;
export const CartRemoveItemDocument = new TypedDocumentString(`
    mutation CartRemoveItem($id: ID!, $productId: ID!) {
  cartRemoveItem(id: $id, productId: $productId) {
    id
    items {
      quantity
      product {
        id
        name
        description
        price
        categories {
          name
        }
        images {
          url
        }
      }
    }
  }
}
    `) as unknown as TypedDocumentString<CartRemoveItemMutation, CartRemoveItemMutationVariables>;
export const CartStatusChangeDocument = new TypedDocumentString(`
    mutation CartStatusChange($cartId: ID!, $userEmail: String!) {
  cartComplete(cartId: $cartId, userEmail: $userEmail) {
    id
    totalAmount
    lines
    status
  }
}
    `) as unknown as TypedDocumentString<CartStatusChangeMutation, CartStatusChangeMutationVariables>;
export const CategoriesGetListDocument = new TypedDocumentString(`
    query CategoriesGetList($countItems: Int!, $offset: Int!) {
  categories(take: $countItems, skip: $offset) {
    data {
      id
      name
      slug
      description
      products {
        images {
          url
        }
      }
    }
    meta {
      count
      total
    }
  }
}
    `) as unknown as TypedDocumentString<CategoriesGetListQuery, CategoriesGetListQueryVariables>;
export const CategoryGetProductsListDocument = new TypedDocumentString(`
    query CategoryGetProductsList($slug: String!) {
  category(slug: $slug) {
    products {
      id
      name
      description
      slug
      categories {
        name
        slug
      }
      collections {
        name
        slug
      }
      images {
        url
        alt
        height
        width
      }
      price
      reviews {
        id
        title
        description
        rating
        email
        author
        updatedAt
      }
    }
  }
}
    `) as unknown as TypedDocumentString<CategoryGetProductsListQuery, CategoryGetProductsListQueryVariables>;
export const CollectionGetProductsListDocument = new TypedDocumentString(`
    query CollectionGetProductsList($slug: String!) {
  collection(slug: $slug) {
    products {
      id
      name
      description
      slug
      categories {
        name
        slug
      }
      collections {
        name
        slug
      }
      images {
        url
        alt
        height
        width
      }
      price
    }
  }
}
    `) as unknown as TypedDocumentString<CollectionGetProductsListQuery, CollectionGetProductsListQueryVariables>;
export const CollectionsGetListDocument = new TypedDocumentString(`
    query CollectionsGetList($countItems: Int!, $offset: Int!) {
  collections(take: $countItems, skip: $offset) {
    data {
      id
      name
      description
      slug
      products {
        images {
          url
        }
      }
    }
    meta {
      count
      total
    }
  }
}
    `) as unknown as TypedDocumentString<CollectionsGetListQuery, CollectionsGetListQueryVariables>;
export const OrdersGetByEmailDocument = new TypedDocumentString(`
    query OrdersGetByEmail($email: String!, $order: SortDirection! = ASC, $orderBy: OrderSortBy! = DEFAULT, $skip: Int! = 0, $take: Int! = 10) {
  orders(
    email: $email
    order: $order
    orderBy: $orderBy
    skip: $skip
    take: $take
  ) {
    data {
      id
      status
      totalAmount
      createdAt
      lines
    }
    meta {
      total
      count
    }
  }
}
    `) as unknown as TypedDocumentString<OrdersGetByEmailQuery, OrdersGetByEmailQueryVariables>;
export const ProductGetItemByIdDocument = new TypedDocumentString(`
    query ProductGetItemById($productId: ID!) {
  product(id: $productId) {
    ...ProductItemFragment
    reviews {
      id
      title
      description
      rating
      email
      author
      updatedAt
    }
  }
}
    fragment ProductItemFragment on Product {
  description
  id
  name
  price
  rating
  slug
  categories {
    name
    slug
  }
  collections {
    name
    slug
  }
  images {
    alt
    height
    url
    width
  }
}`) as unknown as TypedDocumentString<ProductGetItemByIdQuery, ProductGetItemByIdQueryVariables>;
export const ProductsGetListDocument = new TypedDocumentString(`
    query ProductsGetList {
  products {
    data {
      ...ProductItemFragment
    }
    meta {
      count
      total
    }
  }
}
    fragment ProductItemFragment on Product {
  description
  id
  name
  price
  rating
  slug
  categories {
    name
    slug
  }
  collections {
    name
    slug
  }
  images {
    alt
    height
    url
    width
  }
}`) as unknown as TypedDocumentString<ProductsGetListQuery, ProductsGetListQueryVariables>;
export const ProductsGetListByCountItemsDocument = new TypedDocumentString(`
    query ProductsGetListByCountItems($countItems: Int!, $offset: Int!) {
  products(take: $countItems, skip: $offset) {
    data {
      ...ProductItemFragment
    }
    meta {
      count
      total
    }
  }
}
    fragment ProductItemFragment on Product {
  description
  id
  name
  price
  rating
  slug
  categories {
    name
    slug
  }
  collections {
    name
    slug
  }
  images {
    alt
    height
    url
    width
  }
}`) as unknown as TypedDocumentString<ProductsGetListByCountItemsQuery, ProductsGetListByCountItemsQueryVariables>;
export const ProductsSearchByWordDocument = new TypedDocumentString(`
    query ProductsSearchByWord($searchBy: String!) {
  products(search: $searchBy) {
    data {
      ...ProductItemFragment
    }
    meta {
      count
      total
    }
  }
}
    fragment ProductItemFragment on Product {
  description
  id
  name
  price
  rating
  slug
  categories {
    name
    slug
  }
  collections {
    name
    slug
  }
  images {
    alt
    height
    url
    width
  }
}`) as unknown as TypedDocumentString<ProductsSearchByWordQuery, ProductsSearchByWordQueryVariables>;
export const ReviewCreateDocument = new TypedDocumentString(`
    mutation ReviewCreate($author: String!, $description: String!, $email: String!, $productId: ID!, $rating: Int!, $title: String!) {
  reviewCreate(
    author: $author
    description: $description
    email: $email
    productId: $productId
    rating: $rating
    title: $title
  ) {
    id
    items {
      product {
        id
        name
      }
      quantity
    }
  }
}
    `) as unknown as TypedDocumentString<ReviewCreateMutation, ReviewCreateMutationVariables>;