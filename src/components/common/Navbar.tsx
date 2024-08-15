"use client";
import React, { useState, useEffect } from "react";
import MobileSidebar from "./MobileSidebar";
import Image from "next/image";
import { Fira_Mono } from "next/font/google";
import { outfit } from "@/app/fonts";
import Link from "next/link";
import DesktopHomeScreenHoverDropdown from "./DesktopHomeScreenHoverDropdown";
import Auth from "../user/Auth";
import Wishlist from "../user/Wishlist";
import Cart from "../user/Cart";
import { usePathname } from "next/navigation";
const fira_mono = Fira_Mono({ weight: "500", subsets: ["latin"] });

const Navbar = () => {
  const imageUrl =
    "https://utfs.io/f/eeca5582-97b7-4b70-8374-b3a96d989469-iueuwy.jpg";

  const pathname = usePathname();

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

  const backgroundClass = pathname == "/" ? "bg-transparent" : "bg-[#F3F1EA]";

  const textClass = pathname == "/" ? "text-[#f7f7f4]" : "text-black";

  const imageClass = pathname == "/" ? "/group-5286.svg" : "/cb-nav.svg";

  const imagePositionClass = `z-1 relative bottom-[78px] h-[906px] w-full ${
    ["/", "/new-in", "/about-us"].includes(pathname)
      ? `${pathname === "/" ? "lg:bottom-[78px]" : "lg:inset-0 lg:bottom-0 h-[655px]"}`
      : "hidden"
  }`;

  return (
    <>
      <nav
        className={`sticky left-0 top-0 z-50 w-full transition-colors duration-500 ease-in-out ${isSticky ? "bg-[#F3F1EA]" : backgroundClass}`}
      >
        <section
          className={`flex h-[78px] w-full justify-between px-6 py-5 lg:hidden`}
          id={"myNav"}
        >
          {/* Left Section (MobileSidebar) */}
          <div className="flex flex-1 items-center justify-start">
            <MobileSidebar isSticky={isSticky} pathname={pathname} />
          </div>

          {/* Center Section (Image) */}
          <div className="flex flex-1 items-center justify-center">
            <Link href="/">
              <Image
                height="60"
                width="48"
                alt=""
                src={isSticky ? "/cb-nav.svg" : imageClass}
                priority
                style={{ width: "auto", height: "auto" }}
              />
            </Link>
          </div>

          {/* Right Section (Bag) */}
          <div className="flex flex-1 items-center justify-end">
            <span
              className={`${fira_mono.className} text-center text-sm font-medium leading-[14px] tracking-[0.6px] ${
                isSticky ? "text-black" : textClass
              }`}
            >
              Bag[0]
            </span>
          </div>
        </section>

        {/*DESKTOP NAVIGATION BAR   "mx-auto  max-w-7xl px-8 py-5"*/}
        <section className="hidden lg:block">
          <div className={`mx-auto h-[78px] max-w-7xl px-8 py-5`}>
            <div className="flex items-center justify-between">
              {/* Parent flex container */}
              <div className="flex w-full items-center">
                {/* Left Container */}
                <div className="mx-auto flex flex-1 items-center justify-center">
                  <ul className="flex items-center space-x-12">
                    <Link href="/new-in">
                      <li
                        className={`${fira_mono.className} nav-link relative cursor-pointer whitespace-nowrap text-xs leading-[14.4px] tracking-spaced-06 ${isSticky ? "text-[#000000]" : textClass} `}
                      >
                        NEW IN
                      </li>
                    </Link>
                    <Link href="/about-us">
                      <li
                        className={`${fira_mono.className} nav-link relative cursor-pointer whitespace-nowrap text-xs leading-[14.4px] tracking-spaced-06 ${isSticky ? "text-[#000000]" : textClass} `}
                      >
                        ABOUT US
                      </li>
                    </Link>
                    <Link href="/ss24-collection">
                      <li
                        className={`${fira_mono.className} nav-link relative cursor-pointer whitespace-nowrap text-xs leading-[14.4px] tracking-spaced-06 ${isSticky ? "text-[#000000]" : textClass} `}
                      >
                        SS24 COLLECTION
                      </li>
                    </Link>
                  </ul>
                </div>

                {/* Center Container */}
                <div className="mx-auto flex flex-1 items-center justify-center">
                  <Link href="/" className="cursor-pointer">
                    <Image
                      height="60"
                      width="48"
                      alt=""
                      src={isSticky ? "/cb-nav.svg" : imageClass}
                      priority
                      style={{ width: "auto", height: "auto" }}
                    />
                  </Link>
                </div>

                {/* Right Container */}
                <div className="mx-auto flex flex-1 items-center justify-center py-[5px]">
                  <ul className="flex items-center space-x-12">
                    <li
                      className={`${fira_mono.className} nav-link relative cursor-pointer whitespace-nowrap text-xs leading-[14.4px] tracking-spaced-06 ${isSticky ? "text-[#000000]" : textClass} `}
                    >
                      <Auth />
                    </li>

                    <Link href="/user/wishlist">
                      <li
                        className={`${fira_mono.className} nav-link relative cursor-pointer whitespace-nowrap text-xs leading-[14.4px] tracking-spaced-06 ${isSticky ? "text-[#000000]" : textClass} `}
                      >
                        <Wishlist />
                      </li>
                    </Link>
                    <li
                      className={`${fira_mono.className} nav-link relative cursor-pointer whitespace-nowrap text-xs leading-[14.4px] tracking-spaced-06 ${isSticky ? "text-[#000000]" : textClass} `}
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
      <div className={` ${imagePositionClass}`}>
        <Image
          src={imageUrl}
          alt=""
          fill={true}
          style={{ objectFit: "cover" }}
          quality={100}
          priority
        />
        <section className="absolute left-[74px] top-[460px] mt-32 flex w-full flex-col items-center justify-center p-2 lg:left-[102px]">
          <div className="flex flex-col items-center justify-center">
            <h1
              className={`font-400 h-[116px] w-[408px] items-center whitespace-nowrap text-center text-[24px] leading-[57.6px] tracking-[0.6px] text-[#F7F7F4] ${outfit.className} lg:h-[212px] lg:w-[599px] lg:text-[48px] lg:leading-[105.6px]`}
            >
              {"IT'S A PERSPECTIVE"}
            </h1>
            {/* <button className="border-1 mt-6 flex h-[46px] w-60 items-center justify-center gap-[8px] border-[#F7F7F4] bg-[#F7F7F4] px-6 py-4 text-black">
              <span
                className={`${fira_mono.className} text-center text-[12px] leading-[14.4px] tracking-[0.6px]`}
              >
                EXPLORE NEW COLLECTION
              </span>
            </button> */}
          </div>
        </section>
      </div>
    </>
  );
};

export default Navbar;
