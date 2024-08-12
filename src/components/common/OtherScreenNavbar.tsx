import React from "react";
import MobileSidebar from "./MobileSidebar";
import Image from "next/image";
import { Fira_Mono } from "next/font/google";
import Link from "next/link";
import DesktopOtherScreenHoverDropdown from "./DesktopOtherScreenHoverDropdown";
import Auth from "../user/Auth";
import Wishlist from "../user/Wishlist";
import Cart from "../user/Cart";

const fira_mono = Fira_Mono({ weight: "500", subsets: ["latin"] });

const OtherScreenNavbar = () => {
  const imageUrl =
    "https://utfs.io/f/187c24dd-5bc0-47de-b7f8-569a909042ce-i2jfn7.png";
  return (
    <>
      <nav
        className={`sticky left-0 top-0 z-50 w-full bg-[#F3F1EA] transition-all duration-500 ease-in-out`}
      >
        <section
          className={`flex h-[78px] w-full justify-between px-6 py-5 lg:hidden`}
          id={"myNav"}
        >
          {/* Left Section (MobileSidebar) */}
          <div className="flex flex-1 items-center justify-start">
            <MobileSidebar isSticky={true} />
          </div>

          {/* Center Section (Image) */}
          <div className="flex flex-1 items-center justify-center">
            <Image
              height="60"
              width="48"
              alt=""
              src={"/cb-nav.svg"}
              priority
              style={{ width: "auto", height: "auto" }}
            />
          </div>
          {/* Right Section (Bag) */}
          <div className="flex flex-1 items-center justify-end">
            <span
              className={`${fira_mono.className} text-center text-sm font-medium leading-[14px] tracking-[0.6px] text-black`}
            >
              Bag[0]
            </span>
          </div>
        </section>

        <section className="hidden lg:block">
          <div className="mx-auto h-[78px] max-w-7xl px-8 py-5">
            <div className="flex items-center justify-between">
              <div className="flex w-full">
                {/* Left Container */}
                <div className="mx-auto flex flex-1 items-center justify-center">
                  <ul className="flex items-center space-x-12">
                    <Link href="/new-in">
                      <li
                        className={`${fira_mono.className} nav-link "text-[#000000]" relative cursor-pointer whitespace-nowrap text-xs leading-[14.4px] tracking-spaced-06`}
                      >
                        NEW IN
                      </li>
                    </Link>
                    <Link href="/about-us">
                      <li
                        className={`${fira_mono.className} nav-link "text-[#000000]" relative cursor-pointer whitespace-nowrap text-xs leading-[14.4px] tracking-spaced-06`}
                      >
                        ABOUT US
                      </li>
                    </Link>
                    <li>
                      <DesktopOtherScreenHoverDropdown />
                      {/* <DesktopHomeScreenHoverDropdown isSticky={isSticky} /> */}
                    </li>
                  </ul>
                </div>
                {/* Center Container */}
                <div className="mx-auto flex flex-1 items-center justify-center">
                  <Link className="cursor-pointer" href="/">
                    <Image
                      height="60"
                      width="48"
                      alt=""
                      src={"/cb-nav.svg"}
                      priority
                      style={{ width: "auto", height: "auto" }}
                    />
                  </Link>
                </div>
                {/* Right Container */}
                <div className="mx-auto flex flex-1 items-center justify-center">
                  <ul className="flex items-center space-x-12">
                    <li
                      className={`${fira_mono.className} nav-link relative cursor-pointer whitespace-nowrap text-xs leading-[14.4px] tracking-spaced-06 text-[#000000]`}
                    >
                      <Auth />
                    </li>

                    <Link href="/user/wishlist">
                      <li
                        className={`${fira_mono.className} nav-link relative cursor-pointer whitespace-nowrap text-xs leading-[14.4px] tracking-spaced-06 text-[#000000]`}
                      >
                        <Wishlist />
                      </li>
                    </Link>
                    <li
                      className={`${fira_mono.className} nav-link "text-[#000000]" relative cursor-pointer whitespace-nowrap text-xs leading-[14.4px] tracking-spaced-06`}
                    >
                      <Cart />
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
      </nav>
    </>
  );
};

export default OtherScreenNavbar;
