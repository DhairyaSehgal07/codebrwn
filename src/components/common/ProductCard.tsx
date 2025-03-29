/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import { ProductNode } from "@/utils/types";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import { outfit } from "@/app/fonts";
import { Fira_Mono } from "next/font/google";
import { Button } from "../ui/button";
import Link from "next/link";
import { formatTitle, extractQuotedText } from "@/utils/helper";

const fira_mono = Fira_Mono({ weight: "500", subsets: ["latin"] });

const placeholderImage = "/product-image-placeholder.svg";

const currencySymbols: { [key: string]: string } = {
  INR: "₹", // Indian Rupee
  USD: "$", // US Dollar
  EUR: "€", // Euro
  GBP: "£", // British Pound
  JPY: "¥", // Japanese Yen
  // Add more currency codes and symbols as needed
};

interface ProductCardProps {
  product: ProductNode;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const currencyCode = product.priceRange.minVariantPrice.currencyCode;
  const currencySymbol = currencySymbols[currencyCode] || currencyCode;

  const title = extractQuotedText(product.title);

  const formattedTitle = formatTitle(title);

  return (
    <>
      <Card className="ease-in-quad cursor-pointer overflow-hidden rounded-none transition-all duration-150 hover:z-10 hover:scale-[1.02] hover:border-[0.5px] hover:border-black focus-visible:scale-[1.02] focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0">
        <Link href={`/products/${formattedTitle}`} className="">
          <div className="relative aspect-[4/5] w-full">
            <Image
              src={product.featuredImage?.url || placeholderImage}
              alt="Product image"
              layout="fill"
              style={{ objectFit: "contain" }}
              className="object-cover"
            />
          </div>
          <div className="flex justify-between p-2">
            <span
              className={`${outfit.className} m-2 flex items-center justify-center text-[10px] font-light leading-[9.15px] tracking-spaced-06 md:m-4 md:text-base md:leading-[19.2px]`}
            >
              {title}
            </span>
            <span
              className={`${outfit.className} m-2 flex items-center justify-center text-[10px] font-light leading-[9.15px] tracking-spaced-06 text-[#858585] md:m-4 md:text-base md:leading-[19.2px]`}
            >
              {currencySymbol}
              {product.priceRange.minVariantPrice.amount}
            </span>
          </div>
        </Link>
      </Card>
    </>
  );
};

export default ProductCard;
