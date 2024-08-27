import React, { Suspense } from "react";
import { outfit } from "@/app/fonts";
import { getWishlist } from "@/lib/firebase/wishlist";
import { getSession } from "@/app/actions/auth/common";

const WishlistScreen = async () => {
  const session = await getSession();
  const wishlist = await getWishlist(session.id);

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
              {"WISHLIST"}
            </h1>
          </header>
        </section>
        {/* <Suspense fallback={null}>
          <Products id={id} />
        </Suspense> */}
        {JSON.stringify(wishlist)}
      </section>
    </>
  );
};

export default WishlistScreen;
