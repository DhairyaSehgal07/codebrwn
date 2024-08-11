import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/mobilenav";
import { Fira_Mono } from "next/font/google";
const fira_mono = Fira_Mono({ weight: "500", subsets: ["latin"] });
import Link from "next/link";
import MobileHoverDropdown from "./MobileHoverDropdown";

export function MobileSidebar({ isSticky }: { isSticky: boolean }) {
  const textColorClass = isSticky ? "text-black" : "text-white";
  const borderColorClass = isSticky ? "border-black" : "border-white";

  return (
    <Sheet>
      <SheetTrigger asChild>
        <div
          className={`flex h-10 cursor-pointer flex-col justify-center ${textColorClass}`}
        >
          <hr className={`w-[30px] border-[1.8px] ${borderColorClass}`} />
          <hr
            className={`mt-1 w-[17.73px] border-[1.8px] ${borderColorClass}`}
          />
        </div>
      </SheetTrigger>
      <SheetContent side={"left"} className="w-screen bg-[#F3F1EA] lg:hidden">
        <div className="flex min-h-screen flex-col">
          {/* <SheetHeader className="flex w-[50%] items-center justify-center bg-blue-300 text-right">
            <div>Logo</div>
          </SheetHeader> */}

          <main className="flex flex-1 flex-grow flex-col items-center justify-center">
            <ul className="flex flex-col items-center justify-center">
              <Link href="/new-in">
                <li
                  className={`${fira_mono.className} relative cursor-pointer whitespace-nowrap text-center text-2xl leading-[28.8px] tracking-spaced-06 text-[#000000]`}
                >
                  NEW IN
                </li>
              </Link>
              <Link href="/about-us">
                <li
                  className={`${fira_mono.className} relative mt-6 cursor-pointer whitespace-nowrap text-center text-2xl leading-[28.8px] tracking-spaced-06 text-[#000000]`}
                >
                  ABOUT US
                </li>
              </Link>
              <li>
                <MobileHoverDropdown />
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

export default MobileSidebar;