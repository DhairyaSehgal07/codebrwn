"use client";
import React, { useState } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { raleway } from "@/app/fonts";
import { ProductVariant, Customer } from "@/utils/types";
import { Fira_Mono } from "next/font/google";
const fira_mono = Fira_Mono({ weight: "500", subsets: ["latin"] });

const VariantSelector = ({
  variants,
  session,
}: {
  variants: ProductVariant[];
  session: Customer;
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  // State to track the currently selected variant
  const [selectedVariant, setSelectedVariant] = useState<string | null>(
    searchParams.get("variant") || null,
  );

  const handleVariantClick = (variantTitle: string) => {
    const currentParams = new URLSearchParams(searchParams.toString());
    currentParams.set("variant", variantTitle);

    // Update the selected variant
    setSelectedVariant(variantTitle);

    // Push the new URL with updated query parameters
    router.push(`${pathname}?${currentParams.toString()}`);
  };

  return (
    <div className="mt-8">
      <h1
        className={`${raleway.className} text-start font-medium leading-[14.4px] tracking-spaced-06`}
      >
        {variants[0].selectedOptions[0].name}
      </h1>
      <div className="mt-2 border-[0.2px] px-4 py-4">
        <ul className="flex justify-between lg:px-6">
          {variants.map((variant, index) => (
            <li
              onClick={() => handleVariantClick(variant.title)}
              key={index}
              className={`${
                variant.currentlyNotInStock
                  ? "text-gray-400 line-through"
                  : "flex h-12 w-12 cursor-pointer items-center justify-center hover:border hover:border-black"
              } ${
                selectedVariant === variant.title
                  ? "bg-black text-white" // Active state styles
                  : ""
              }`}
            >
              {variant.title}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-8 flex gap-5">
        <button className="w-full border border-black py-4">
          <span
            className={`${fira_mono.className} leading[14.4px] text-sm tracking-spaced-06`}
          >
            ADD TO BAG
          </span>
        </button>
        <button className="w-full border bg-black py-4">
          <span
            className={`${fira_mono.className} leading[14.4px] text-sm tracking-spaced-06 text-white`}
          >
            ADD TO WISHLIST
          </span>
        </button>
      </div>
    </div>
  );
};

export default VariantSelector;
