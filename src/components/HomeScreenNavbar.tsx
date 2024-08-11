"use client";
import React, { useState, useEffect } from "react";
import MobileSidebar from "./common/MobileSidebar";
import Image from "next/image";
import { Fira_Mono } from "next/font/google";
import { outfit } from "@/app/fonts";
import Link from "next/link";
import DesktopHomeScreenHoverDropdown from "./common/DesktopHomeScreenHoverDropdown";
const fira_mono = Fira_Mono({ weight: "500", subsets: ["latin"] });

const HomeScreenNavbar = () => {
  const imageUrl =
    "https://utfs.io/f/187c24dd-5bc0-47de-b7f8-569a909042ce-i2jfn7.png";

  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const nav = document.getElementById("myNav");
      if (nav) {
        setIsSticky(window.scrollY > nav.offsetHeight);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <nav
        className={`sticky left-0 top-0 z-50 w-full transition-colors duration-500 ease-in-out ${isSticky ? "bg-[#F3F1EA]" : "bg-transparent"}`}
      >
        <section
          className={`flex h-[78px] w-full justify-between px-6 py-5 lg:hidden`}
          id={"myNav"}
        >
          {/* Left Section (MobileSidebar) */}
          <div className="flex flex-1 items-center justify-start">
            <MobileSidebar isSticky={isSticky} />
          </div>

          {/* Center Section (Image) */}
          <div className="flex flex-1 items-center justify-center">
            <Image
              height="60"
              width="48"
              alt=""
              src={isSticky ? "/cb-nav.svg" : "/group-5286.svg"}
              priority
              style={{ width: "auto", height: "auto" }}
            />
          </div>

          {/* Right Section (Bag) */}
          <div className="flex flex-1 items-center justify-end">
            <span
              className={`${fira_mono.className} text-center text-sm font-medium leading-[14px] tracking-[0.6px] ${
                isSticky ? "text-black" : "text-white"
              }`}
            >
              Bag[0]
            </span>
          </div>
        </section>

        {/*DESKTOP NAVIGATION BAR   "mx-auto  max-w-7xl px-8 py-5"*/}
        <section className="hidden lg:block">
          <div
            className={`mx-auto ${isSticky ? "h-[78px] py-5" : "h-auto py-5"} max-w-7xl px-8`}
          >
            <div className="flex items-center justify-between">
              {/* Parent flex container */}
              <div className="flex w-full">
                {/* Left Container */}
                <div className="mx-auto flex flex-1 items-center justify-center">
                  <ul className="flex items-center space-x-12">
                    <Link href="/new-in">
                      <li
                        className={`${fira_mono.className} nav-link cursor-pointer whitespace-nowrap text-xs leading-[14.4px] tracking-spaced-06 ${isSticky ? "text-[#000000]" : "text-[#f7f7f4]"} `}
                      >
                        NEW IN
                      </li>
                    </Link>
                    <Link href="/about-us">
                      <li
                        className={`${fira_mono.className} nav-link cursor-pointer whitespace-nowrap text-xs leading-[14.4px] tracking-spaced-06 ${isSticky ? "text-[#000000]" : "text-[#f7f7f4]"} `}
                      >
                        ABOUT US
                      </li>
                    </Link>
                    <li>
                      <DesktopHomeScreenHoverDropdown isSticky={isSticky} />
                    </li>
                  </ul>
                </div>

                {/* Center Container */}
                <div className="mx-auto flex flex-1 items-center justify-center">
                  <Image
                    height="60"
                    width="48"
                    alt=""
                    src={isSticky ? "/cb-nav.svg" : "/group-5286.svg"}
                    priority
                    style={{ width: "auto", height: "auto" }}
                  />
                </div>

                {/* Right Container */}
                <div className="mx-auto flex flex-1 items-center justify-center">
                  <ul className="flex items-center space-x-12">
                    <Link href="/auth">
                      <li
                        className={`${fira_mono.className} nav-link cursor-pointer whitespace-nowrap text-xs leading-[14.4px] tracking-spaced-06 ${isSticky ? "text-[#000000]" : "text-[#f7f7f4]"} `}
                      >
                        SIGN IN
                      </li>
                    </Link>

                    <Link href="/user/wishlist">
                      <li
                        className={`${fira_mono.className} nav-link cursor-pointer whitespace-nowrap text-xs leading-[14.4px] tracking-spaced-06 ${isSticky ? "text-[#000000]" : "text-[#f7f7f4]"} `}
                      >
                        WISHLIST
                      </li>
                    </Link>
                    <Link href="/user/cart">
                      <li
                        className={`${fira_mono.className} nav-link cursor-pointer whitespace-nowrap text-xs leading-[14.4px] tracking-spaced-06 ${isSticky ? "text-[#000000]" : "text-[#f7f7f4]"} `}
                      >
                        BAG[0]
                      </li>
                    </Link>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
      </nav>
      <div
        className={`z-1 relative bottom-[78px] ${isSticky ? "lg:bottom-[78px]" : "lg:bottom-[81px]"} h-[906px] w-full`}
      >
        <Image
          src={imageUrl}
          alt=""
          fill={true}
          style={{ objectFit: "cover" }}
          quality={100}
          priority
        />
        <section className="absolute mt-96 flex w-full flex-col items-center justify-center p-2">
          <div className="flex flex-col items-center justify-center">
            <h1
              className={`font-400 h-[116px] w-[408px] items-center text-center text-[48px] leading-[57.6px] tracking-[0.6px] text-[#F7F7F4] ${outfit.className} lg:h-[212px] lg:w-[599px] lg:text-[88px] lg:leading-[105.6px]`}
            >
              TAGLINE FOR THE BRAND
            </h1>
            <button className="border-1 mt-6 flex h-[46px] w-60 items-center justify-center gap-[8px] border-[#F7F7F4] bg-[#F7F7F4] px-6 py-4 text-black">
              <span
                className={`${fira_mono.className} text-center text-[12px] leading-[14.4px] tracking-[0.6px]`}
              >
                EXPLORE NEW COLLECTION
              </span>
            </button>
          </div>
        </section>
      </div>
    </>
  );
};

export default HomeScreenNavbar;
