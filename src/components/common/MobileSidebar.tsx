import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/mobilenav";
import { Fira_Mono } from "next/font/google";
const fira_mono = Fira_Mono({ weight: "500", subsets: ["latin"] });
import Link from "next/link";
import { X } from "lucide-react";
import Image from "next/image";
import Cart from "../user/Cart";
import Auth from "../user/Auth";
import Wishlist from "../user/Wishlist";

interface MobileSidebarProps {
  isSticky: boolean;
  pathname: string;
}

export function MobileSidebar({ isSticky, pathname }: MobileSidebarProps) {
  const textColorClass = isSticky
    ? "text-black"
    : pathname == "/"
      ? "text-[#f7f7f4]"
      : "text-black";
  const borderColorClass = isSticky
    ? "border-black"
    : pathname == "/"
      ? "border-[#f7f7f4]"
      : "border-black";

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
      <SheetContent
        side={"left"}
        className="flex min-h-screen w-screen flex-col bg-[#F3F1EA] lg:hidden"
      >
        <SheetHeader>
          <nav className="absolute left-0 top-0 w-full">
            <ul className="flex justify-between bg-[#F3F1EA] px-6 py-8">
              <li className="flex flex-1 items-center justify-start">
                <SheetClose asChild>
                  <button>
                    <X strokeWidth={1} className="h-10 w-10" />
                    <span className="sr-only">Close</span>
                  </button>
                </SheetClose>
              </li>

              <li className="flex flex-1 items-center justify-center">
                <SheetClose asChild>
                  <Link href="/">
                    <Image
                      height="60"
                      width="48"
                      alt="Navigation Logo"
                      src="/cb-nav.svg"
                      priority
                      style={{ width: "auto", height: "auto" }}
                    />
                  </Link>
                </SheetClose>
              </li>

              <li className="flex flex-1 items-center justify-end">
                <span
                  className={`${fira_mono.className} text-center text-sm font-medium leading-[14px] tracking-[0.6px]`}
                >
                  <Cart />
                </span>
              </li>
            </ul>
          </nav>
        </SheetHeader>
        <div className="flex flex-1 flex-col">
          <main className="flex flex-1 flex-col items-center justify-center">
            <ul className="flex flex-col items-center justify-center">
              <SheetClose asChild>
                <Link href="/">
                  <li
                    className={`${fira_mono.className} relative cursor-pointer whitespace-nowrap text-center text-2xl leading-[28.8px] tracking-spaced-06 text-[#000000]`}
                  >
                    HOME
                  </li>
                </Link>
              </SheetClose>
              <SheetClose asChild>
                <Link href="/new-in">
                  <li
                    className={`${fira_mono.className} relative mt-6 cursor-pointer whitespace-nowrap text-center text-2xl leading-[28.8px] tracking-spaced-06 text-[#000000]`}
                  >
                    NEW IN
                  </li>
                </Link>
              </SheetClose>
              <SheetClose asChild>
                <Link href="/about-us">
                  <li
                    className={`${fira_mono.className} relative mt-6 cursor-pointer whitespace-nowrap text-center text-2xl leading-[28.8px] tracking-spaced-06 text-[#000000]`}
                  >
                    ABOUT US
                  </li>
                </Link>
              </SheetClose>
              <SheetClose asChild>
                <button>
                  <li
                    className={`${fira_mono.className} relative mt-6 cursor-pointer whitespace-nowrap text-center text-2xl leading-[28.8px] tracking-spaced-06 text-[#000000]`}
                  >
                    <div>
                      <Auth />
                    </div>
                  </li>
                </button>
              </SheetClose>
              <SheetClose asChild>
                <button>
                  <li
                    className={`${fira_mono.className} relative mt-6 cursor-pointer whitespace-nowrap text-center text-2xl leading-[28.8px] tracking-spaced-06 text-[#000000]`}
                  >
                    <Wishlist />
                  </li>
                </button>
              </SheetClose>
            </ul>
          </main>

          <footer className="mt-auto grid grid-rows-2 space-y-[10px] py-2">
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
              @2024 , CODEBRWN
            </div>
          </footer>
        </div>
      </SheetContent>
    </Sheet>
  );
}

export default MobileSidebar;
