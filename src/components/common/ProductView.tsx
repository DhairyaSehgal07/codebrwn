import React, { Suspense } from "react";
import { outfit } from "@/app/fonts";
import { API_URL, STOREFRONT_TOKEN, headers } from "@/utils/const";
import { GET_SINGLE_HOME_COLLECTION } from "@/lib/graphql/queries";
import ProductCard from "./ProductCard";
import { Fira_Mono } from "next/font/google";

const fira_mono = Fira_Mono({ weight: "500", subsets: ["latin"] });
interface ProductViewProps {
  title: string;
  id: string;
}

interface ProductProps {
  id: string;
}

export async function Products({ id }: ProductProps) {
  const reqBody = {
    query: GET_SINGLE_HOME_COLLECTION,
    variables: { id },
  };

  try {
    const response = await fetch(API_URL!, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(reqBody),
      next: { revalidate: 1800 },
    });

    if (!response.ok) {
      // Handle HTTP errors
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const { data, errors } = await response.json();

    const products = data.collection.products.edges;

    if (errors) {
      // Handle GraphQL errors
      throw new Error(errors[0].message ?? errors.message);
    }

    return (
      <>
        <section className="mx-auto mt-8 max-w-full">
          <div className="grid grid-cols-2 gap-x-1 gap-y-1 lg:grid-cols-4 lg:gap-x-[1px]">
            {products.map((item: any) => (
              <ProductCard key={item.node.id} product={item.node} />
            ))}
          </div>
        </section>
        <div className="mt-9 flex items-center justify-center lg:hidden">
          <button className="h-[54px] w-[132px] gap-[8px] border-[1.2px] border-[#000000] px-6 py-4">
            <p
              className={`${fira_mono.className} text-center text-sm leading-[14.4px] tracking-[0.6px]`}
            >
              VIEW MORE
            </p>
          </button>
        </div>
      </>
    );
  } catch (error) {
    console.error("Error making request:", error);
    throw error;
  }
}

const ProductView: React.FC<ProductViewProps> = async ({ title, id }) => {
  return (
    <>
      <section className="lg:w-2xl mt-16 w-full px-6 lg:mx-auto lg:mt-24 lg:w-full lg:px-16">
        <h1
          className={`${outfit.className} text-2xl font-medium leading-7 tracking-[0.6px] lg:hidden`}
        >
          {title}
        </h1>
        <section className="hidden lg:block">
          <header className="flex items-center justify-between">
            <h1
              className={`${outfit.className} text-center text-[32px] font-medium leading-[38.4px] tracking-spaced-06`}
            >
              {title}
            </h1>
            <button className="h-[46px] w-[122px] gap-[8px] border-[1px] border-[#000000] bg-[#FFFFFF] px-6 py-4 text-center">
              <p
                className={`${fira_mono.className} text-center text-xs leading-[14.4px] tracking-spaced-06 text-[#000000]`}
              >
                VIEW MORE
              </p>
            </button>
          </header>
        </section>
        <Suspense fallback={null}>
          <Products id={id} />
        </Suspense>
      </section>
    </>
  );
};

export default ProductView;
