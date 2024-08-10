import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/mobilenav";
import { Fira_Mono } from "next/font/google";
import HoverDropdown from "./HoverDropdown";

const fira_mono = Fira_Mono({ weight: "500", subsets: ["latin"] });

export function MobileNavbar() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <div className="flex h-10 cursor-pointer flex-col justify-center text-white">
          <hr className="w-[30px] border-[1.8px] border-white"></hr>
          <hr className="mt-1 w-[17.73px] border-[1.8px] border-white"></hr>
        </div>
      </SheetTrigger>
      <SheetContent side={"left"} className="w-screen bg-[#F3F1EA] lg:hidden">
        <div className="flex min-h-screen flex-col">
          {/* <SheetHeader className="flex w-[50%] items-center justify-center bg-blue-300 text-right">
            <div>Logo</div>
          </SheetHeader> */}

          <main className="flex flex-1 flex-grow flex-col">
            <ul className="mt-32 flex flex-col items-center justify-center">
              <li className={`${fira_mono.className} mobile-nav-link`}>
                NEW IN
              </li>
              <li className={`${fira_mono.className} mobile-nav-link mt-6`}>
                ABOUT US
              </li>
              <li className={`${fira_mono.className} mobile-nav-link mt-6`}>
                <HoverDropdown />
              </li>
            </ul>
          </main>

          <footer className="space- grid grid-rows-2 space-y-[10px] py-10">
            <div className="flex gap-8">
              <span
                className={`${fira_mono.className} mobile-nav-footer-link underline`}
              >
                Terms & Conditions
              </span>
              <span
                className={`${fira_mono.className} mobile-nav-footer-link underline`}
              >
                Privacy policy
              </span>
            </div>
            <div
              className={`${fira_mono.className} text-xs leading-[14.px] tracking-spaced-06`}
            >
              @2024 , CODE BRWN
            </div>
          </footer>
        </div>
      </SheetContent>
    </Sheet>
  );
}

export default MobileNavbar;
