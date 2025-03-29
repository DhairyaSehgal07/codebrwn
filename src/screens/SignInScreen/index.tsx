import { outfit } from "@/app/fonts";
import Link from "next/link";
import { Fira_Mono } from "next/font/google";
import { fira_mono } from "@/app/fonts";
import SignInForm from "@/components/SignInForm";

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
          <SignInForm />
        </section>
      </main>
    </>
  );
};

export default SignInScreen;
