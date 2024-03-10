/* eslint-disable */
import * as types from './graphql';



/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "mutation CartAddItemMutation($id: ID!, $input: MutationCartAddItemInput!) {\n  cartAddItem(id: $id, input: $input) {\n    id\n    items {\n      quantity\n      product {\n        id\n        name\n        description\n        price\n        images {\n          url\n        }\n      }\n    }\n  }\n}": types.CartAddItemMutationDocument,
    "mutation CartChangeItemQuantity($id: ID!, $productId: ID!, $quantity: Int!) {\n  cartChangeItemQuantity(id: $id, productId: $productId, quantity: $quantity) {\n    id\n    items {\n      quantity\n      product {\n        id\n        name\n        description\n        price\n        images {\n          url\n        }\n      }\n    }\n  }\n}": types.CartChangeItemQuantityDocument,
    "mutation CartFindOrCreateMutation($id: ID, $input: MutationCartFindOrCreateInput = {}) {\n  cartFindOrCreate(id: $id, input: $input) {\n    id\n    items {\n      quantity\n      product {\n        id\n        name\n        description\n        price\n        categories {\n          name\n        }\n        images {\n          url\n        }\n      }\n    }\n  }\n}": types.CartFindOrCreateMutationDocument,
    "mutation CartRemoveItem($id: ID!, $productId: ID!) {\n  cartRemoveItem(id: $id, productId: $productId) {\n    id\n    items {\n      quantity\n      product {\n        id\n        name\n        description\n        price\n        categories {\n          name\n        }\n        images {\n          url\n        }\n      }\n    }\n  }\n}": types.CartRemoveItemDocument,
    "mutation CartStatusChange($cartId: ID!, $userEmail: String!) {\n  cartComplete(cartId: $cartId, userEmail: $userEmail) {\n    id\n    totalAmount\n    lines\n    status\n  }\n}": types.CartStatusChangeDocument,
    "query CategoriesGetList($countItems: Int!, $offset: Int!) {\n  categories(take: $countItems, skip: $offset) {\n    data {\n      id\n      name\n      slug\n      description\n      products {\n        images {\n          url\n        }\n      }\n    }\n    meta {\n      count\n      total\n    }\n  }\n}": types.CategoriesGetListDocument,
    "query CategoryGetProductsList($slug: String!) {\n  category(slug: $slug) {\n    products {\n      id\n      name\n      description\n      slug\n      categories {\n        name\n        slug\n      }\n      collections {\n        name\n        slug\n      }\n      images {\n        url\n        alt\n        height\n        width\n      }\n      price\n      reviews {\n        id\n        title\n        description\n        rating\n        email\n        author\n        updatedAt\n      }\n    }\n  }\n}": types.CategoryGetProductsListDocument,
    "query CollectionGetProductsList($slug: String!) {\n  collection(slug: $slug) {\n    products {\n      id\n      name\n      description\n      slug\n      categories {\n        name\n        slug\n      }\n      collections {\n        name\n        slug\n      }\n      images {\n        url\n        alt\n        height\n        width\n      }\n      price\n    }\n  }\n}": types.CollectionGetProductsListDocument,
    "query CollectionsGetList($countItems: Int!, $offset: Int!) {\n  collections(take: $countItems, skip: $offset) {\n    data {\n      id\n      name\n      description\n      slug\n      products {\n        images {\n          url\n        }\n      }\n    }\n    meta {\n      count\n      total\n    }\n  }\n}": types.CollectionsGetListDocument,
    "query OrdersGetByEmail($email: String!, $order: SortDirection! = ASC, $orderBy: OrderSortBy! = DEFAULT, $skip: Int! = 0, $take: Int! = 10) {\n  orders(\n    email: $email\n    order: $order\n    orderBy: $orderBy\n    skip: $skip\n    take: $take\n  ) {\n    data {\n      id\n      status\n      totalAmount\n      createdAt\n      lines\n    }\n    meta {\n      total\n      count\n    }\n  }\n}": types.OrdersGetByEmailDocument,
    "query ProductGetItemById($productId: ID!) {\n  product(id: $productId) {\n    ...ProductItemFragment\n    reviews {\n      id\n      title\n      description\n      rating\n      email\n      author\n      updatedAt\n    }\n  }\n}": types.ProductGetItemByIdDocument,
    "fragment ProductItemFragment on Product {\n  description\n  id\n  name\n  price\n  rating\n  slug\n  categories {\n    name\n    slug\n  }\n  collections {\n    name\n    slug\n  }\n  images {\n    alt\n    height\n    url\n    width\n  }\n}": types.ProductItemFragmentFragmentDoc,
    "query ProductsGetList {\n  products {\n    data {\n      ...ProductItemFragment\n    }\n    meta {\n      count\n      total\n    }\n  }\n}": types.ProductsGetListDocument,
    "query ProductsGetListByCountItems($countItems: Int!, $offset: Int!) {\n  products(take: $countItems, skip: $offset) {\n    data {\n      ...ProductItemFragment\n    }\n    meta {\n      count\n      total\n    }\n  }\n}": types.ProductsGetListByCountItemsDocument,
    "query ProductsSearchByWord($searchBy: String!) {\n  products(search: $searchBy) {\n    data {\n      ...ProductItemFragment\n    }\n    meta {\n      count\n      total\n    }\n  }\n}": types.ProductsSearchByWordDocument,
    "mutation ReviewCreate($author: String!, $description: String!, $email: String!, $productId: ID!, $rating: Int!, $title: String!) {\n  reviewCreate(\n    author: $author\n    description: $description\n    email: $email\n    productId: $productId\n    rating: $rating\n    title: $title\n  ) {\n    id\n    items {\n      product {\n        id\n        name\n      }\n      quantity\n    }\n  }\n}": types.ReviewCreateDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation CartAddItemMutation($id: ID!, $input: MutationCartAddItemInput!) {\n  cartAddItem(id: $id, input: $input) {\n    id\n    items {\n      quantity\n      product {\n        id\n        name\n        description\n        price\n        images {\n          url\n        }\n      }\n    }\n  }\n}"): typeof import('./graphql').CartAddItemMutationDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation CartChangeItemQuantity($id: ID!, $productId: ID!, $quantity: Int!) {\n  cartChangeItemQuantity(id: $id, productId: $productId, quantity: $quantity) {\n    id\n    items {\n      quantity\n      product {\n        id\n        name\n        description\n        price\n        images {\n          url\n        }\n      }\n    }\n  }\n}"): typeof import('./graphql').CartChangeItemQuantityDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation CartFindOrCreateMutation($id: ID, $input: MutationCartFindOrCreateInput = {}) {\n  cartFindOrCreate(id: $id, input: $input) {\n    id\n    items {\n      quantity\n      product {\n        id\n        name\n        description\n        price\n        categories {\n          name\n        }\n        images {\n          url\n        }\n      }\n    }\n  }\n}"): typeof import('./graphql').CartFindOrCreateMutationDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation CartRemoveItem($id: ID!, $productId: ID!) {\n  cartRemoveItem(id: $id, productId: $productId) {\n    id\n    items {\n      quantity\n      product {\n        id\n        name\n        description\n        price\n        categories {\n          name\n        }\n        images {\n          url\n        }\n      }\n    }\n  }\n}"): typeof import('./graphql').CartRemoveItemDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation CartStatusChange($cartId: ID!, $userEmail: String!) {\n  cartComplete(cartId: $cartId, userEmail: $userEmail) {\n    id\n    totalAmount\n    lines\n    status\n  }\n}"): typeof import('./graphql').CartStatusChangeDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query CategoriesGetList($countItems: Int!, $offset: Int!) {\n  categories(take: $countItems, skip: $offset) {\n    data {\n      id\n      name\n      slug\n      description\n      products {\n        images {\n          url\n        }\n      }\n    }\n    meta {\n      count\n      total\n    }\n  }\n}"): typeof import('./graphql').CategoriesGetListDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query CategoryGetProductsList($slug: String!) {\n  category(slug: $slug) {\n    products {\n      id\n      name\n      description\n      slug\n      categories {\n        name\n        slug\n      }\n      collections {\n        name\n        slug\n      }\n      images {\n        url\n        alt\n        height\n        width\n      }\n      price\n      reviews {\n        id\n        title\n        description\n        rating\n        email\n        author\n        updatedAt\n      }\n    }\n  }\n}"): typeof import('./graphql').CategoryGetProductsListDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query CollectionGetProductsList($slug: String!) {\n  collection(slug: $slug) {\n    products {\n      id\n      name\n      description\n      slug\n      categories {\n        name\n        slug\n      }\n      collections {\n        name\n        slug\n      }\n      images {\n        url\n        alt\n        height\n        width\n      }\n      price\n    }\n  }\n}"): typeof import('./graphql').CollectionGetProductsListDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query CollectionsGetList($countItems: Int!, $offset: Int!) {\n  collections(take: $countItems, skip: $offset) {\n    data {\n      id\n      name\n      description\n      slug\n      products {\n        images {\n          url\n        }\n      }\n    }\n    meta {\n      count\n      total\n    }\n  }\n}"): typeof import('./graphql').CollectionsGetListDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query OrdersGetByEmail($email: String!, $order: SortDirection! = ASC, $orderBy: OrderSortBy! = DEFAULT, $skip: Int! = 0, $take: Int! = 10) {\n  orders(\n    email: $email\n    order: $order\n    orderBy: $orderBy\n    skip: $skip\n    take: $take\n  ) {\n    data {\n      id\n      status\n      totalAmount\n      createdAt\n      lines\n    }\n    meta {\n      total\n      count\n    }\n  }\n}"): typeof import('./graphql').OrdersGetByEmailDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query ProductGetItemById($productId: ID!) {\n  product(id: $productId) {\n    ...ProductItemFragment\n    reviews {\n      id\n      title\n      description\n      rating\n      email\n      author\n      updatedAt\n    }\n  }\n}"): typeof import('./graphql').ProductGetItemByIdDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment ProductItemFragment on Product {\n  description\n  id\n  name\n  price\n  rating\n  slug\n  categories {\n    name\n    slug\n  }\n  collections {\n    name\n    slug\n  }\n  images {\n    alt\n    height\n    url\n    width\n  }\n}"): typeof import('./graphql').ProductItemFragmentFragmentDoc;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query ProductsGetList {\n  products {\n    data {\n      ...ProductItemFragment\n    }\n    meta {\n      count\n      total\n    }\n  }\n}"): typeof import('./graphql').ProductsGetListDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query ProductsGetListByCountItems($countItems: Int!, $offset: Int!) {\n  products(take: $countItems, skip: $offset) {\n    data {\n      ...ProductItemFragment\n    }\n    meta {\n      count\n      total\n    }\n  }\n}"): typeof import('./graphql').ProductsGetListByCountItemsDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query ProductsSearchByWord($searchBy: String!) {\n  products(search: $searchBy) {\n    data {\n      ...ProductItemFragment\n    }\n    meta {\n      count\n      total\n    }\n  }\n}"): typeof import('./graphql').ProductsSearchByWordDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation ReviewCreate($author: String!, $description: String!, $email: String!, $productId: ID!, $rating: Int!, $title: String!) {\n  reviewCreate(\n    author: $author\n    description: $description\n    email: $email\n    productId: $productId\n    rating: $rating\n    title: $title\n  ) {\n    id\n    items {\n      product {\n        id\n        name\n      }\n      quantity\n    }\n  }\n}"): typeof import('./graphql').ReviewCreateDocument;


export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}
