import React from "react";
import { fira_mono } from "@/app/fonts";

const TopBanner = () => {
  return (
    <>
      <header className="bg-white">
        <div className="flex justify-center gap-2">
          <span
            className={`mt-[0.4px] h-6 w-full bg-darkgreen p-2 text-center text-[10px] leading-[10px] tracking-[0.8px] text-white opacity-90 ${fira_mono.className} `}
          >
            FREE SHIPPING ON ORDERS ABOVE RS.5,000
          </span>
        </div>
      </header>
    </>
  );
};

export default TopBanner;
