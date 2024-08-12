"use client";
import { useState } from "react";
import { Fira_Mono } from "next/font/google";
import { ChevronDown, ChevronUp } from "lucide-react";
import { usePathname } from "next/navigation";

const fira_mono = Fira_Mono({ weight: "500", subsets: ["latin"] });

const DesktopOtherScreenHoverDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const handleMouseEnter = () => setIsOpen(true);
  const handleMouseLeave = () => {
    // Add a delay before hiding
    setTimeout(() => {
      if (!document.querySelector("#dropdownDelay:hover")) {
        setIsOpen(false);
      }
    }, 200); // Delay as per data-dropdown-delay
  };

  return (
    <>
      <main
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="relative inline-block"
      >
        <button id="DropdownDelayButton" className="flex items-center gap-1">
          <span
            className={`${fira_mono.className} nav-link relative cursor-pointer whitespace-nowrap text-xs leading-[14.4px] tracking-spaced-06 text-[#000000]`}
          >
            SS24 COLLECTION
          </span>
          {isOpen ? (
            <span
              className={`mt-[1px] flex items-center justify-center text-[#000000]`}
            >
              <ChevronUp strokeWidth={1} size={16} />
            </span>
          ) : (
            <span
              className={`mt-[1px] flex items-center justify-center text-[#000000]`}
            >
              <ChevronDown strokeWidth={1} size={16} />
            </span>
          )}
        </button>

        {/*DROPDOWN MENU */}
        <div
          id="dropdownDelay"
          className={`absolute z-10 mt-3 w-full items-center divide-y divide-gray-100 bg-[rgba(0,0,0,0.4)] p-4 shadow transition-opacity duration-500 dark:bg-transparent ${isOpen ? "opacity-100" : "pointer-events-none opacity-0"}`}
        >
          <ul
            className={`flex ${fira_mono.className} flex-col gap-4 text-[#f7f7f4]`}
          >
            <li className="block transform cursor-pointer text-[12px] leading-[14.4px] tracking-[0.6px] transition-transform hover:scale-105 hover:underline">
              T-SHIRTS
            </li>
            <li className="block transform cursor-pointer text-[12px] leading-[14.4px] tracking-[0.6px] transition-transform hover:scale-105 hover:underline">
              CAPS
            </li>
            {/* <li>CAPS</li> */}
          </ul>
        </div>
      </main>
    </>
  );
};

export default DesktopOtherScreenHoverDropdown;
