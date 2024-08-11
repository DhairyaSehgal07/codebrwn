"use client";
import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { Fira_Mono } from "next/font/google";
import { ChevronDown, ChevronUp } from "lucide-react";
import Link from "next/link";

const fira_mono = Fira_Mono({ weight: "500", subsets: ["latin"] });

const MobileHoverDropdown = () => {
  // State to manage the open/close status of the dropdown
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <DropdownMenu onOpenChange={(open) => setIsOpen(open)}>
        <DropdownMenuTrigger asChild>
          <div className="mt-6 flex items-center gap-1">
            <h1
              className={`${fira_mono.className} cursor-pointer whitespace-nowrap text-center text-2xl leading-[28.8px] tracking-spaced-06 text-[#000000]`}
            >
              SS24 COLLECTION
            </h1>
            {/* Conditional rendering of Chevron icons */}
            {isOpen ? (
              <span className="mt-[1.4px] flex items-center justify-center">
                <ChevronUp strokeWidth={1} size={28} />
              </span>
            ) : (
              <span className="mt-[1.4px] flex items-center justify-center">
                <ChevronDown strokeWidth={1} size={28} />
              </span>
            )}
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className={`mt-6 flex w-auto items-center justify-center transition-all duration-500 ease-in ${
            isOpen ? "translate-y-0 opacity-100" : "-translate-y-2 opacity-0"
          }`}
        >
          <ul className="flex flex-col items-center justify-center gap-4">
            <Link href="/t-shirts">
              <li
                className={`${fira_mono.className} flex items-center justify-center text-center`}
              >
                T-SHIRTS
              </li>
            </Link>
            <Link href="/caps">
              <li
                className={`${fira_mono.className} flex items-center justify-center text-center`}
              >
                CAPS
              </li>
            </Link>
          </ul>
        </DropdownMenuContent>
      </DropdownMenu>
      {/* Push Down Text */}
      <div
        className={`duration-5 mt-6 transition-all ease-in ${
          isOpen ? "mt-6 translate-y-[84px]" : ""
        }`}
      >
        <ul>
          <li
            className={`${fira_mono.className} text-[#000000]} relative cursor-pointer whitespace-nowrap text-center text-2xl leading-[28.8px] tracking-spaced-06`}
          >
            SIGN IN
          </li>
          <li
            className={`${fira_mono.className} text-[#000000]} relative mt-6 cursor-pointer whitespace-nowrap text-center text-2xl leading-[28.8px] tracking-spaced-06`}
          >
            WISHLIST
          </li>
        </ul>
      </div>
    </div>
  );
};

export default MobileHoverDropdown;
