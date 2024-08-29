import { Suspense } from "react";
import HeroBackground from "@/components/common/HeroBackground";
import ProductView from "@/components/common/ProductView";
import React from "react";
import { outfit } from "@/app/fonts";
import { Products } from "@/components/common/ProductView";
import Loader from "@/components/common/Loader";

const NewInScreen = () => {
  return (
    <>
      <HeroBackground heading="NEW IN" />
      <section className="lg:w-2xl mt-16 w-full px-6 lg:mx-auto lg:mt-24 lg:w-full lg:px-16">
        <h1
          className={`${outfit.className} text-2xl font-medium leading-7 tracking-[0.6px] lg:hidden`}
        >
          {"LATEST PRODUCTS"}
        </h1>
        <section className="hidden lg:block">
          <header className="flex items-center justify-between">
            <h1
              className={`${outfit.className} text-center text-[32px] font-medium leading-[38.4px] tracking-spaced-06`}
            >
              {"LATEST PRODUCTS"}
            </h1>
          </header>
        </section>
        <Suspense fallback={<Loader />}>
          <Products id={"gid://shopify/Collection/306787156148"} />
        </Suspense>
      </section>
    </>
  );
};

export default NewInScreen;
