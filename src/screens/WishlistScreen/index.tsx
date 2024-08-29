/* eslint-disable jsx-a11y/alt-text */
import React, { Suspense } from "react";
import { outfit } from "@/app/fonts";
import { getWishlist, removeFromWishlist } from "@/lib/firebase/wishlist";
import { getSession } from "@/app/actions/auth/common";
import Loader from "@/components/common/Loader";
import { Customer, WishlistItem } from "@/utils/types";
import { extractQuotedText, formatTitle } from "@/utils/helper";
import Link from "next/link";
import { Fira_Mono } from "next/font/google";
import RemoveFromWishlistButton from "@/components/RemoveFromWishlistButton";
import AddToWishlistButton from "@/components/AddToWIshlistButton";

const fira_mono = Fira_Mono({ weight: "500", subsets: ["latin"] });

const placeholderImage = "/product-image-placeholder.svg";

const ProductCard = ({
  product,
  session,
}: {
  product: WishlistItem;
  session: Customer;
}) => {
  const title = extractQuotedText(product.name);

  const formattedTitle = formatTitle(title);

  return (
    <>
      <Link
        className="ease-in-quad cursor-pointer transition-all duration-150 hover:z-10 hover:scale-[1.02] hover:border-[0.5px] hover:border-black focus-visible:scale-[1.02] focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0"
        href={`/products/${formattedTitle}`}
      >
        <div className="group relative">
          <picture className="aspect-h-1 aspect-w-1 lg:aspect-none w-full overflow-hidden hover:opacity-75 lg:h-96">
            <img src={product.imageUrl || placeholderImage} />
          </picture>
          <div className="flex flex-col items-center justify-center">
            <span
              className={`${outfit.className} m-2 flex items-center justify-center text-[10px] font-light leading-[9.15px] tracking-spaced-06 md:m-4 md:text-base md:leading-[19.2px]`}
            >
              {title}
            </span>
          </div>
        </div>
      </Link>

      <RemoveFromWishlistButton session={session} item={product} />
    </>
  );
};

const Products = async () => {
  const session = await getSession();
  const wishlist = await getWishlist(session.id);

  return (
    <>
      <section className="mx-auto mt-8 max-w-full">
        <div className="grid grid-cols-2 gap-x-1 gap-y-1 lg:grid-cols-4 lg:gap-x-12">
          {wishlist?.items.map((item: WishlistItem, index: number) => (
            <div key={index}>
              <ProductCard product={item} session={session} />
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

const WishlistScreen = async () => {
  return (
    <>
      <section className="lg:w-2xl mt-16 w-full px-6 lg:mx-auto lg:mt-24 lg:w-full lg:px-16">
        <h1
          className={`${outfit.className} text-2xl font-medium leading-7 tracking-[0.6px] lg:hidden`}
        >
          {"WISHLIST"}
        </h1>
        <section className="hidden lg:block">
          <header className="flex items-center justify-between">
            <h1
              className={`${outfit.className} text-center text-[32px] font-medium leading-[38.4px] tracking-spaced-06`}
            >
              {"YOUR WISHLIST"}
            </h1>
          </header>
        </section>
        <Suspense fallback={<Loader />}>
          <Products />
        </Suspense>
      </section>
    </>
  );
};

// Ensure the component dynamically fetches data every time it's visited
export const dynamic = "force-dynamic";

export default WishlistScreen;
