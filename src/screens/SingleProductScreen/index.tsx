import React, { Suspense } from "react";
import { API_URL, headers } from "@/utils/const";
import SingleProductCard from "@/components/common/SingleProductCard";
import { NormalizedProduct, Product } from "@/utils/types";
import Loader from "@/components/common/Loader";

function flattenProductData(productData: {
  product: Product;
}): NormalizedProduct {
  const flattenedProduct: NormalizedProduct = {
    ...productData.product,
    images: productData.product.images.edges.map((edge) => edge.node),
    variants: productData.product.variants.edges.map((edge) => edge.node),
  };

  return flattenedProduct;
}

const SingleProductScreen = async ({ handle }: { handle: string }) => {
  const reqBody = {
    query: `
      query ProductTitle {
        product(handle: "${handle}") {
            title
    description
    featuredImage {
      id
      height
      width
      url
    }
    images(first: 10) {
      edges {
        node {
          id 
          height
          width
          url
        }
      }
    }
    priceRange {
      minVariantPrice {
        amount
        currencyCode
      }
      maxVariantPrice {
        amount
        currencyCode
      }
    }
    compareAtPriceRange {
      minVariantPrice {
        amount
        currencyCode
      }
      maxVariantPrice {
        amount
        currencyCode
      }
    }
    variants(first: 10) {
      edges {
        node {
          id
          title
          currentlyNotInStock
          sku
          priceV2 {
            amount
            currencyCode
          }
          compareAtPriceV2 {
            amount
            currencyCode
          }
          availableForSale
          selectedOptions {
            name
            value
          }
          image {
            id 
            height
            width
            url
          }
        }
      }
    }
    vendor
    productType
    tags
    totalInventory
    createdAt
    updatedAt
        }
      }
    `,
  };

  try {
    const response = await fetch(API_URL!, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(reqBody),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const { data, errors } = await response.json();

    if (errors) {
      throw new Error(errors[0]?.message ?? "An error occurred");
    }

    const product = data?.product;

    if (!product) {
      return <div>Product not found.</div>;
    }

    const normalizedProduct: NormalizedProduct = flattenProductData({
      product,
    });

    return (
      <>
        <Suspense fallback={<Loader />}>
          <SingleProductCard product={normalizedProduct} />
        </Suspense>
      </>
    );
  } catch (error) {
    console.error("Error making request:", error);
    return <div>Error loading product details. Please try again later.</div>;
  }
};

export default SingleProductScreen;
