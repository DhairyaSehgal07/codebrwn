import React from "react";
import { outfit } from "@/app/fonts";
import Link from "next/link";
import { Fira_Mono } from "next/font/google";
import { fira_mono } from "@/app/fonts";

const fira_mono500 = Fira_Mono({ weight: "500", subsets: ["latin"] });

const SignInScreen = () => {
  return (
    <>
      <main className="mt-14 flex flex-col items-center justify-center">
        <h1
          className={`${outfit.className} text-[32px] font-normal leading-[40.32px] tracking-spaced-06 md:text-5xl lg:text-6xl lg:leading-[80.64px]`}
        >
          SIGN IN
        </h1>
        <section className="mt-14 w-full px-6 sm:mx-auto sm:w-[600px]">
          <form className="flex flex-col">
            <label
              className={`${outfit.className} text-base leading-[19.2px] text-[#828282]`}
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="border-b-[0.6px] border-[#828282] py-[6px] focus:outline-none"
              type="email"
              name="email"
              id="email"
              aria-label="Email address input field"
            />

            <label
              className={`${outfit.className} mt-8 text-base leading-[19.2px] text-[#828282]`}
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="border-b-[0.6px] border-[#828282] py-[6px] focus:outline-none"
              type="password"
              name="password"
              id="password"
              aria-label="Password input field"
            />

            <div
              className={`${fira_mono500.className} mt-8 text-end text-xs leading-[12px] tracking-[0.32px]`}
            >
              <span className="underline">Forgot Password?</span>
            </div>

            <div className="mt-11 flex flex-col items-center justify-center">
              <span className="text-center">
                <p
                  className={`${fira_mono.className} text-base font-bold leading-[19.2px]`}
                >
                  {"Don't have an account?"}{" "}
                  <Link href="/auth/sign-up">Sign Up</Link>
                </p>

                <button
                  className="mt-8 w-full border-[1.18px] border-black py-[14px]"
                  type="submit"
                >
                  <span
                    className={`${fira_mono.className} text-[12px] leading-[14.4px]`}
                  >
                    SIGN IN
                  </span>
                </button>
              </span>
            </div>
          </form>
        </section>
      </main>
    </>
  );
};

export default SignInScreen;
