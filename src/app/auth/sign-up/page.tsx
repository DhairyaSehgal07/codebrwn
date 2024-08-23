import React from "react";
import SignUpScreen from "@/screens/SignUpScreen";
import { outfit } from "@/app/fonts";
import Navbar from "@/components/common/Navbar";
import SignUpForm from "@/components/SignUpForm";

const page = () => {
  return (
    <>
      <main className="mt-14 flex flex-col items-center justify-center">
        <h1
          className={`${outfit.className} text-[32px] font-normal leading-[40.32px] tracking-spaced-06 md:text-5xl lg:text-6xl lg:leading-[80.64px]`}
        >
          SIGN UP
        </h1>
        <section className="mt-14 w-full px-6 sm:mx-auto sm:w-[600px]">
          <SignUpForm />
        </section>
      </main>
    </>
  );
};

export default page;
