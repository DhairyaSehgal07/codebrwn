// Define the type for a single product
export interface ProductNode {
  id: string;
  title: string;
  featuredImage: {
    url: string;
  } | null; // featuredImage might be null
  priceRange: {
    minVariantPrice: {
      amount: string;
      currencyCode: string;
    };
    maxVariantPrice: {
      amount: string;
      currencyCode: string;
    };
  };
}

// Define the type for the collection
interface Collection {
  id: string;
  title: string;
  products: {
    edges: {
      node: ProductNode;
    }[];
  };
}

// Define the type for the full query response
interface GetCollectionByIdResponse {
  collection: Collection | null; // collection might be null if not found
}
