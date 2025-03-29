import React from "react";
import { getSession } from "@/app/actions/auth/common";
import { redirect } from "next/navigation";
import { logout } from "@/app/actions/auth/common";
import { Input } from "@/components/ui/input";
import { roboto } from "@/app/fonts";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { outfit } from "@/app/fonts";
import Image from "next/image";
import { Fira_Mono } from "next/font/google";
import Link from "next/link";

const orderIcon = "/orders.svg";
const profileIcon = "/profile.svg";
const wishlistIcon = "/Path.svg";
const helpIcon = "/faqs.svg";
const signOutIcon = "/sign-out.svg";

const fira_mono = Fira_Mono({ weight: "500", subsets: ["latin"] });

const ProfileScreen = async () => {
  // const session = await getSession();

  return (
    <>
      <main className="mt-14 flex flex-grow flex-col items-center justify-center">
        <h1
          className={`${outfit.className} text-[32px] font-normal leading-[40.32px] tracking-spaced-06 md:text-5xl lg:text-6xl lg:leading-[80.64px]`}
        >
          YOUR ACCOUNT
        </h1>

        <section className="mt-14 w-full px-6 sm:mx-auto sm:w-[600px]">
          <div
            className={`${roboto.className} focus:outline-hidden border-b-[0.6px] border-[#828282] px-1 py-[6px] text-base`}
          >
            <div className="mb-4">
              <Link
                className="flex w-1/3 items-center justify-start gap-3 px-2"
                href="/user/orders"
              >
                <Image src={orderIcon} alt="" height={"28"} width={"28"} />
                <span
                  className={`${fira_mono.className} flex items-center justify-center text-lg font-light leading-[19.2px] tracking-spaced-06`}
                >
                  Orders
                </span>
              </Link>
            </div>
          </div>

          <div
            className={`${roboto.className} focus:outline-hidden border-b-[0.6px] border-[#828282] px-1 py-[6px] text-base`}
          >
            <div className="mb-4 mt-8">
              <Link
                className="flex w-1/2 items-center justify-start gap-3 px-2 sm:w-1/3"
                href="/user/profile/data"
              >
                <Image src={profileIcon} alt="" height={"28"} width={"28"} />
                <span
                  className={`${fira_mono.className} flex items-center justify-center text-lg font-light leading-[19.2px] tracking-spaced-06`}
                >
                  Your Data
                </span>
              </Link>
            </div>
          </div>

          <div
            className={`${roboto.className} focus:outline-hidden border-b-[0.6px] border-[#828282] px-1 py-[6px] text-base`}
          >
            <div className="mb-4 mt-8">
              <Link
                className="flex w-1/3 items-center justify-start gap-3 px-2"
                href="/user/wishlist"
              >
                <Image src={wishlistIcon} alt="" height={"28"} width={"28"} />
                <span
                  className={`${fira_mono.className} flex items-center justify-center text-lg font-light leading-[19.2px] tracking-spaced-06`}
                >
                  Wishlist
                </span>
              </Link>
            </div>
          </div>

          <div
            className={`${roboto.className} focus:outline-hidden border-b-[0.6px] border-[#828282] px-1 py-[6px] text-base`}
          >
            <div className="mb-4 mt-8">
              <Link
                className="flex w-1/3 items-center justify-start gap-3 px-2"
                href="/help"
              >
                <Image src={helpIcon} alt="" height={"28"} width={"28"} />
                <span
                  className={`${fira_mono.className} flex items-center justify-center text-lg font-light leading-[19.2px] tracking-spaced-06`}
                >
                  Help
                </span>
              </Link>
            </div>
          </div>

          <div
            className={`${roboto.className} focus:outline-hidden border-b-[0.6px] border-[#828282] px-1 py-[6px] text-base`}
          >
            <div className="mb-4 mt-8 flex items-center justify-start gap-3 px-2">
              <Image src={signOutIcon} alt="" height={"28"} width={"28"} />
              <span
                className={`${fira_mono.className} flex items-center justify-center text-lg font-light leading-[19.2px] tracking-spaced-06`}
              >
                Sign Out
              </span>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default ProfileScreen;
