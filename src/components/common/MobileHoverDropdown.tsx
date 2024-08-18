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
import Auth from "../user/Auth";
import Wishlist from "../user/Wishlist";
import { SessionProvider } from "@/context/SessionContext";

const fira_mono = Fira_Mono({ weight: "500", subsets: ["latin"] });

const MobileHoverDropdown = () => {
  // State to manage the open/close status of the dropdown
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mt-6">
      <ul>
        <li
          className={`${fira_mono.className} text-[#000000]} relative cursor-pointer whitespace-nowrap text-center text-2xl leading-[28.8px] tracking-spaced-06`}
        >
          <SessionProvider>
            <Auth />
          </SessionProvider>
        </li>
        <li
          className={`${fira_mono.className} text-[#000000]} relative mt-6 cursor-pointer whitespace-nowrap text-center text-2xl leading-[28.8px] tracking-spaced-06`}
        >
          <Wishlist />
        </li>
      </ul>
    </div>
  );
};

export default MobileHoverDropdown;
