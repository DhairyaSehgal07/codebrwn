"use client";
import React, { useState } from "react";
import { Fira_Mono } from "next/font/google";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, ChevronUp } from "lucide-react";

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
    }, 100); // Delay as per data-dropdown-delay
  };

  const handleClick = () => setIsOpen((prev) => !prev);

  // Determine the text color based on the pathname
  const textColor = pathname === "/" ? "lg:#F7F7F4 #000000" : "#000000";

  return (
    <>
      {/*MOBILE VIEW */}

      <main
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="relative inline-block lg:hidden"
      >
        {/* Button */}
        <button
          id="dropdownDelayButton"
          onClick={handleClick}
          className={`${firaMono.className}mobile-nav-link flex gap-1`}
          style={{ color: textColor }}
          type="button"
        >
          <span className="ml-8 focus:outline-none">SS24 COLLECTION</span>
          {isOpen ? (
            <span className="flex items-center justify-center">
              <ChevronDown strokeWidth={1} size={28} />
            </span>
          ) : (
            <span className="flex items-center justify-center">
              <ChevronUp strokeWidth={1} size={28} />
            </span>
          )}
        </button>

        {/* Dropdown Menu */}
        <div
          id="dropdownDelay"
          className={`shadow-xs z-10 mt-2 flex items-center justify-center transition-opacity duration-500 dark:bg-transparent ${isOpen ? "opacity-100" : "pointer-events-none opacity-0"}`}
        >
          <ul className="py-1">
            <li className="flex justify-center">
              <Link
                href="t-shirts"
                className={`${firaMono.className} mobile-nav-dropdown-link`}
              >
                T-SHIRTS
              </Link>
            </li>
            <li className="flex justify-center">
              <Link
                href="t-shirts"
                className={`${firaMono.className} mobile-nav-dropdown-link`}
              >
                CAPS
              </Link>
            </li>
          </ul>
        </div>
      </main>

      {/*DESKTOP VIEW */}
      <main
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="relative hidden lg:inline-block"
      >
        {/* Button */}
        <button
          id="dropdownDelayButton"
          className={`${firaMono.className} flex cursor-pointer items-center text-[12px] leading-[14.4px] tracking-[0.6px]`}
          style={{ color: textColor }}
          type="button"
        >
          <span>SS24 COLLECTION</span>
          {isOpen ? (
            <ChevronDown strokeWidth={1.5} size={16} />
          ) : (
            <ChevronUp strokeWidth={1.5} size={16} />
          )}
        </button>

        {/* Dropdown Menu */}
        <div
          id="dropdownDelay"
          className={`absolute z-10 w-44 items-center divide-y divide-gray-100 rounded-lg ${pathname === "/" ? "bg-transparent" : "border bg-[#F3F1EA] p-4 py-2"} shadow-xs transition-opacity duration-500 dark:bg-transparent ${isOpen ? "opacity-100" : "pointer-events-none opacity-0"}`}
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
          </ul>
        </div>
      </main>
    </>
  );
};

export default HoverDropdown;
