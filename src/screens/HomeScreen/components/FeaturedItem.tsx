import React from "react";
import { API_URL, STOREFRONT_TOKEN } from "@/utils/const";
import { outfit } from "@/app/fonts";
import { Fira_Mono } from "next/font/google";
import Image from "next/image";
import { extractQuotedText, formatTitle } from "@/utils/helper";
import Link from "next/link";
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

    const title = extractQuotedText(product.title);

    const formattedTitle = formatTitle(title);

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
                className={`${outfit.className} mt-4 px-1 text-center text-[30px] font-semibold leading-[41.6px] tracking-[0.6px]`}
              >
                {title}
              </h1>
              <div className="mt-4 flex items-center justify-center">
                <p
                  style={{
                    textAlign: "justify", // Align text evenly on both sides
                    hyphens: "auto", // Enable hyphenation for better text wrapping
                  }}
                  className={`${outfit.className} w-[382px] px-6 text-center font-light leading-6 tracking-[0.6px] md:w-auto`}
                >
                  {product.description}
                </p>
              </div>
              <div className="flex justify-center">
                <Link
                  href={`/products/${formattedTitle}`}
                  className="my-12 flex h-[54px] w-[168px] items-center justify-center gap-[8px] border-[1px] border-white px-6 py-4"
                >
                  <p
                    className={`${fira_mono.className} text-center text-sm leading-[14.4px] tracking-[0.6px]`}
                  >
                    DISCOVER MORE
                  </p>
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="hidden w-full bg-[#4C000A] py-[160px] text-white xl:block">
          <div className="mx-[210px] grid max-w-full grid-cols-2 items-center lg:space-x-40 2xl:space-x-8">
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
                  className={`${outfit.className} mt-4 text-center text-[32px] font-semibold leading-[41.6px] tracking-[0.6px]`}
                >
                  {title}
                </h1>
                <div className="mt-4 flex items-center justify-center">
                  <p
                    style={{
                      textAlign: "justify", // Align text evenly on both sides
                      hyphens: "auto", // Enable hyphenation for better text wrapping
                    }}
                    className={`${outfit.className} text-center font-light leading-[28.6px] tracking-[0.6px] lg:w-[450px] 2xl:w-auto`}
                  >
                    {product.description}
                  </p>
                </div>
                <div className="flex justify-center">
                  <Link
                    href={`/products/${formattedTitle}`}
                    className="my-12 flex h-[54px] w-[168px] items-center justify-center gap-[8px] border-[1px] border-white px-6 py-4"
                  >
                    <p
                      className={`${fira_mono.className} text-center text-sm leading-[14.4px] tracking-[0.6px]`}
                    >
                      DISCOVER MORE
                    </p>
                  </Link>
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
