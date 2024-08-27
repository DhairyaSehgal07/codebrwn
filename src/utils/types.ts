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

export interface Customer {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  notifications: boolean;
}

export interface ProductImage {
  id: string;
  height: string;
  width: string;
  url: string;
}

interface ProductPrice {
  amount: string;
  currencyCode: string;
}

export interface ProductVariant {
  id: string;
  title: string;
  currentlyNotInStock: boolean;
  sku: string;
  priceV2: ProductPrice;
  compareAtPriceV2: ProductPrice | null;
  availableForSale: boolean;
  selectedOptions: {
    name: string;
    value: string;
  }[];
  image: ProductImage | null;
}

export interface Product {
  id: string;
  title: string;
  description: string;
  featuredImage: ProductImage | null;
  images: {
    edges: {
      node: ProductImage;
    }[];
  };
  priceRange: {
    minVariantPrice: ProductPrice;
    maxVariantPrice: ProductPrice;
  };
  compareAtPriceRange: {
    minVariantPrice: ProductPrice;
    maxVariantPrice: ProductPrice;
  };
  variants: {
    edges: {
      node: ProductVariant;
    }[];
  };
  vendor: string;
  productType: string;
  tags: string[];
  totalInventory: number;
  createdAt: string;
  updatedAt: string;
}

export interface NormalizedProduct {
  id: string;
  title: string;
  description: string;
  featuredImage: ProductImage | null;
  images: ProductImage[];
  priceRange: {
    minVariantPrice: ProductPrice;
    maxVariantPrice: ProductPrice;
  };
  compareAtPriceRange: {
    minVariantPrice: ProductPrice;
    maxVariantPrice: ProductPrice;
  };
  variants: ProductVariant[];
  vendor: string;
  productType: string;
  tags: string[];
  totalInventory: number;
  createdAt: string;
  updatedAt: string;
}

export type CartItem = {
  productId: string;
  id: string;
  name: string;
  price: number;
  currencyCode: string;
  compareAtPrice?: string;
  imageUrl: string;
  size: string;
  quantity: number;
};

export interface OldCartData {
  cart: {
    cartInfo: {
      items: CartItem[];
      totalPrice: number;
    };
  };
  userId: string;
  shopifyCartId: string;
  shopifyCartExpiry: string;
  success: boolean;
}

export interface WishlistItem {
  id: string;
  name: string;
  price: number;
  currencyCode: string;
  compareAtPrice?: string;
  imageUrl: string;
}

export interface OldWishlistData {
  success: boolean;
  wishlist: {
    items: WishlistItem[];
    userId: string;
  };
}

export type LineItem = {
  merchandiseId: string;
  quantity: number;
};
