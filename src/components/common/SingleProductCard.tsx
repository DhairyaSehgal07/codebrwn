import Image from "next/image";
import React from "react";
import { ProductCarousel } from "../ProductCarousel";
import { outfit } from "@/app/fonts";
import ProductDetials from "../ProductDetials";
import { NormalizedProduct } from "@/utils/types";
import ImageGalleryGrid from "../ImageGalleryGrid";
import VariantSelector from "../VariantSelector";
import { getSession } from "@/app/actions/auth/common";

const SingleProductCard = async ({
  product,
}: {
  product: NormalizedProduct;
}) => {
  const placeholderImage = "/product-image-placeholder.svg";

  const session = await getSession();

  return (
    <div className="flex flex-col lg:mt-[72px] lg:flex-row">
      {/* Mobile View */}

      <ProductCarousel images={product.images} />

      {/* Desktop View */}
      <div className="hidden lg:block lg:w-7/12">
        <ImageGalleryGrid images={product.images} />
      </div>

      <section className="mx-6 mt-8 lg:mx-0 lg:w-5/12 lg:text-center">
        <div className="lg:px-16">
          <div className="flex justify-between">
            <span
              className={`${outfit.className} font-semibold leading-[19px] tracking-spaced-06 md:text-xl`}
            >
              {product.title.toUpperCase()}
            </span>
            <span
              className={`${outfit.className} font-semibold leading-[19px] tracking-spaced-06 md:text-xl`}
            >
              {product.priceRange.minVariantPrice.currencyCode}{" "}
              {product.priceRange.minVariantPrice.amount}
            </span>
          </div>

          <VariantSelector
            session={session}
            variants={product.variants}
            productName={product.title}
          />

          <ProductDetials productDetails={product.description} />

          <div className="mt-[100px] lg:hidden">
            <h1
              className={`${outfit.className} text-[24px] leading-[30px] tracking-[0.84px] text-[#000000]`}
            >
              YOU MAY ALSO LIKE
            </h1>
            <div className="mt-4 flex space-x-4 overflow-x-auto">
              <div className="w-[220px] flex-shrink-0">
                <Image
                  src={placeholderImage}
                  alt="Product 1"
                  width={220}
                  height={300}
                  className="object-cover"
                  quality={100}
                />
                <div className="mt-2 text-center">Product 1</div>
              </div>
              <div className="w-[220px] flex-shrink-0">
                <Image
                  src={placeholderImage}
                  alt="Product 2"
                  width={220}
                  height={300}
                  className="object-cover"
                  quality={100}
                />
                <div className="mt-2 text-center">Product 2</div>
              </div>
              <div className="w-[220px] flex-shrink-0">
                <Image
                  src={placeholderImage}
                  alt="Product 3"
                  width={220}
                  height={300}
                  className="object-cover"
                  quality={100}
                />
                <div className="mt-2 text-center">Product 3</div>
              </div>
              <div className="w-[220px] flex-shrink-0">
                <Image
                  src={placeholderImage}
                  alt="Product 4"
                  width={220}
                  height={300}
                  className="object-cover"
                  quality={100}
                />
                <div className="mt-2 text-center">Product 4</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SingleProductCard;
