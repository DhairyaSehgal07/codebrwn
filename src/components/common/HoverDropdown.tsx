"use client";
import React, { useState } from "react";
import { Fira_Mono } from "next/font/google";
import Link from "next/link";
import { usePathname } from "next/navigation";

const firaMono = Fira_Mono({ weight: "500", subsets: ["latin"] });

const HoverDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname(); // Corrected the typo

  // Handle mouse enter and leave
  const handleMouseEnter = () => setIsOpen(true);
  const handleMouseLeave = () => {
    // Add a delay before hiding
    setTimeout(() => {
      if (!document.querySelector("#dropdownDelay:hover")) {
        setIsOpen(false);
      }
    }, 500); // Delay as per data-dropdown-delay
  };

  // Determine the text color based on the pathname
  const textColor = pathname === "/" ? "#F7F7F4" : "#000000";

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative inline-block"
    >
      {/* Button */}
      <button
        id="dropdownDelayButton"
        className={`${firaMono.className} flex cursor-pointer items-center text-[12px] leading-[14.4px] tracking-[0.6px]`}
        style={{ color: textColor }}
        type="button"
      >
        SS24 COLLECTION
        <svg
          className="ms-1 h-2.5 w-2.5" // Reduced margin for better alignment
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 6"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 1 4 4 4-4"
          />
        </svg>
      </button>

      {/* Dropdown Menu */}
      <div
        id="dropdownDelay"
        className={`absolute z-10 w-44 items-center divide-y divide-gray-100 rounded-lg ${pathname === "/" ? "bg-transparent" : "border bg-[#F3F1EA] p-4 py-2"} shadow transition-opacity duration-500 dark:bg-transparent ${isOpen ? "opacity-100" : "pointer-events-none opacity-0"}`}
      >
        <ul className="py-1">
          <li className="flex justify-start">
            <Link
              href="t-shirts"
              className={`${firaMono.className} block transform py-2 text-[12px] leading-[14.4px] tracking-[0.6px] transition-transform hover:scale-110 hover:underline`}
              style={{ color: textColor }}
            >
              T-SHIRTS
            </Link>
          </li>
          <li className="flex justify-start">
            <a
              href="#"
              className={`${firaMono.className} block transform py-2 text-[12px] leading-[14.4px] tracking-[0.6px] transition-transform hover:scale-110 hover:underline`}
              style={{ color: textColor }}
            >
              CAPS
            </a>
          </li>
          <li className="flex justify-start">
            <a
              href="#"
              className={`${firaMono.className} block transform py-2 text-[12px] leading-[14.4px] tracking-[0.6px] transition-transform hover:scale-110 hover:underline`}
              style={{ color: textColor }}
            >
              HOODEIS
            </a>
          </li>
          <li className="flex justify-start">
            <a
              href="#"
              className={`${firaMono.className} block transform py-2 text-[12px] leading-[14.4px] tracking-[0.6px] transition-transform hover:scale-110 hover:underline`}
              style={{ color: textColor }}
            >
              ACCESSORIES
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default HoverDropdown;
