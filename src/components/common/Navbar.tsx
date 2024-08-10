"use client";
import React from "react";
import TopBanner from "./TopBanner";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { Fira_Mono } from "next/font/google";
import Link from "next/link";
import HoverDropdown from "./HoverDropdown";
import Usernav from "./Usernav";
import { outfit } from "@/app/fonts";
import MobileNavbar from "./MobileNavbar";

const fira_mono = Fira_Mono({ weight: "500", subsets: ["latin"] });

const Navbar = () => {
  const pathname = usePathname();
  const imageUrl =
    "https://utfs.io/f/187c24dd-5bc0-47de-b7f8-569a909042ce-i2jfn7.png";

  return (
    <>
      {pathname === "/" ? (
        <>
          <main className="bg-white">
            <TopBanner />
            <div className="relative h-[906px] w-full">
              <Image
                src={imageUrl}
                alt=""
                fill={true}
                style={{ objectFit: "cover" }}
                quality={100}
                priority
              />
              {/* This is phone navigation bar */}
              <nav className="relative h-[338px] lg:hidden">
                <div className="absolute inset-0 flex h-96 justify-between px-6 py-5">
                  <MobileNavbar />
                  <div>
                    <Image
                      height="60"
                      width="48"
                      alt=""
                      src="/group-5286.svg"
                      priority
                      className="mb-1 ml-5"
                      style={{ width: "auto", height: "auto" }}
                    />
                  </div>
                  <div className="mt-2">
                    <span
                      className={`${fira_mono.className} text-center text-sm font-medium leading-[14px] tracking-[0.6px] text-white`}
                    >
                      Bag[0]
                    </span>
                  </div>
                </div>
              </nav>

              {/* THIS IS DESKTOP NAVIGATION BAR */}
              <nav className="relative hidden h-[338px] text-white lg:flex lg:flex-col lg:justify-center">
                <div className="mt-10 flex h-full w-full items-start justify-between px-20">
                  <div className="flex flex-1 justify-center">
                    <ul className="flex items-center gap-[48px]">
                      <Link href="/new-in">
                        <li className={`${fira_mono.className} nav-link`}>
                          NEW IN
                        </li>
                      </Link>
                      <Link href="/about-us">
                        <li className={`${fira_mono.className} nav-link`}>
                          ABOUT US
                        </li>
                      </Link>

                      <li className={`${fira_mono.className} nav-link`}>
                        <HoverDropdown />
                      </li>
                    </ul>
                  </div>

                  <div className="flex flex-1 justify-center">
                    <Image
                      height="64"
                      width="51"
                      alt=""
                      src="/group-5286.svg"
                      priority
                    />
                  </div>

                  <div className="flex flex-1 justify-center">
                    {/* <ul className="flex gap-[48px]">
                      <li className={`${fira_mono.className} nav-link`}>
                        Search
                      </li>
                    </ul> */}
                    <Usernav />
                  </div>
                </div>
              </nav>

              <div className="relative">
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
              </div>
            </div>
          </main>
        </>
      ) : (
        <>this is other screen navbar</>
      )}
    </>
  );
};

export default Navbar;
