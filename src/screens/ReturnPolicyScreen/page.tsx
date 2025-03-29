import React from "react";
import { outfit } from "@/app/fonts";

const ReturnPolicyScreen = () => {
  return (
    <>
      <main className="mt-14 flex flex-grow flex-col items-center justify-center">
        <h1
          className={`${outfit.className} text-[32px] font-normal leading-[40.32px] tracking-spaced-06 md:text-5xl lg:text-6xl lg:leading-[80.64px]`}
        >
          RETURNS AND EXCHANGE
        </h1>
      </main>
    </>
  );
};

export default ReturnPolicyScreen;
