import React from "react";
import { API_URL, STOREFRONT_TOKEN } from "@/utils/const";
import { outfit } from "@/app/fonts";
import { Fira_Mono } from "next/font/google";
import Image from "next/image";

const fira_mono = Fira_Mono({ weight: "500", subsets: ["latin"] });

interface FeaturedItemProps {
  id: string;
}

interface Product {
  title: string;
  featuredImage: {
    url: string;
  };
  description: string;
}

const placeholderImage = "/product-image-placeholder.svg";

export async function FeaturedItemTest({
  id,
}: FeaturedItemProps): Promise<JSX.Element> {
  const query = `
    query getProductById($id: ID!) {
      product(id: $id) {
        title
        description
        featuredImage {
          url
        }
      }
    }
  `;

  const reqBody = {
    query: query,
    variables: { id },
  };

  const headers = {
    "Content-Type": "application/json",
    "X-Shopify-Storefront-Access-Token": STOREFRONT_TOKEN!,
  };

  try {
    const response = await fetch(API_URL!, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(reqBody),
    });

    if (!response.ok) {
      // Handle HTTP errors
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const { data, errors } = await response.json();

    if (errors) {
      // Handle GraphQL errors
      throw new Error(errors[0]?.message ?? "An error occurred");
    }

    const product: Product = data.product;

    return (
      <>
        <div className="w-full bg-[#4C000A] text-white xl:hidden">
          <div className="mx-auto grid max-w-2xl grid-cols-1 items-center">
            <picture className="relative mx-6 mt-8 h-[726px] md:mx-0 md:mt-[160px]">
              <Image
                src={product.featuredImage.url || placeholderImage}
                alt=""
                fill={true}
                style={{ objectFit: "cover" }}
                quality={100}
                priority
              />
            </picture>
            <div className="mt-16 flex flex-col items-center justify-center">
              <h2
                className={`${outfit.className} text-center text-sm font-bold leading-[16.8px] tracking-[0.6px] text-[#999999]`}
              >
                FEATURED
              </h2>
              <h1
                className={`${outfit.className} mt-4 text-center text-[32px] leading-[41.6px] tracking-[0.6px]`}
              >
                {product.title.toUpperCase()}
              </h1>
              <div className="mt-4 flex items-center justify-center">
                <p
                  className={`${outfit.className} w-[382px] text-center text-[22px] font-light leading-[28.6px] tracking-[0.6px] md:w-auto`}
                >
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Non
                  officia repudiandae, consectetur natus cumque corporis
                  voluptate quas quod ad fugiat.
                </p>
              </div>
              <div className="flex justify-center">
                <button className="my-12 h-[54px] w-[168px] gap-[8px] border-[1px] border-white px-6 py-4">
                  <p
                    className={`${fira_mono.className} text-center text-sm leading-[14.4px] tracking-[0.6px]`}
                  >
                    DISCOVER MORE
                  </p>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="hidden w-full bg-[#4C000A] py-[160px] text-white xl:block">
          <div className="mx-[210px] grid max-w-full grid-cols-2 items-center space-x-8">
            {/* Image Section */}
            <picture className="relative h-[726px]">
              <Image
                src={product.featuredImage.url || placeholderImage}
                alt=""
                fill={true}
                style={{ objectFit: "cover" }}
                quality={100}
                priority
              />
            </picture>

            {/* Content Section */}
            <div className="relative z-10 p-16">
              <div className="mt-16 flex flex-col items-center justify-center">
                <h2
                  className={`${outfit.className} text-center text-sm font-bold leading-[16.8px] tracking-[0.6px] text-[#999999]`}
                >
                  FEATURED
                </h2>
                <h1
                  className={`${outfit.className} mt-4 text-center text-[32px] leading-[41.6px] tracking-[0.6px]`}
                >
                  {product.title.toUpperCase()}
                </h1>
                <div className="mt-4 flex items-center justify-center">
                  <p
                    className={`${outfit.className} text-center text-[22px] font-light leading-[28.6px] tracking-[0.6px] lg:w-auto`}
                  >
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Non
                    officia repudiandae, consectetur natus cumque corporis
                    voluptate quas quod ad fugiat.
                  </p>
                </div>
                <div className="flex justify-center">
                  <button className="my-12 h-[54px] w-[168px] gap-[8px] border-[1px] border-white px-6 py-4">
                    <p
                      className={`${fira_mono.className} text-center text-sm leading-[14.4px] tracking-[0.6px]`}
                    >
                      DISCOVER MORE
                    </p>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  } catch (error) {
    console.error("Error making request:", error);
    throw error;
  }
}

export default FeaturedItemTest;
