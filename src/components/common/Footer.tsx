import React from "react";
import Image from "next/image";
import { outfit, fira_mono, roboto } from "@/app/fonts";
import { Fira_Mono } from "next/font/google";

const firaMono2 = Fira_Mono({ weight: "500", subsets: ["latin"] });

const Footer = () => {
  return (
    <>
      {/*MOBILE VIEW */}
      <footer className="mt-[136px] h-[870px] gap-[80px] overflow-hidden bg-[#4C000A] px-6 py-14 lg:hidden">
        <div className="flex h-[90px] flex-col gap-[16px]">
          <h2
            className={`${outfit.className} text-[10px] leading-[10px] tracking-[0.6px] text-[#888888]`}
          >
            SUBSCRIBE TO OUR NEWSLETTER
          </h2>
          <p
            className={`${fira_mono.className} h-[64px] text-[12px] leading-[16px] tracking-[-0.5px] text-[#FFFFFF]`}
          >
            By entering your email address below, you consent to receiving our
            newsletter with access to our latest collections, events &
            initiatives. More details on this are provided in our{" "}
            <u>Privacy Policy.</u>
          </p>

          <form>
            <div className="flex h-[50px] items-center border-b-[1.18px] border-[#FFFFFF] bg-[#4C000A]">
              <input
                className={`${roboto.className} w-full bg-[#4C000A] px-2 py-0 text-[16px] leading-[19.2px] text-white outline-none`}
                id="email"
                type="email"
                placeholder="Email"
              />
              {/* <button> */}
              <Image
                height="20"
                width="19"
                alt=""
                src="/eparrowup@2x.png"
                priority
                className="mr-2 mt-1"
              />
              {/* </button> */}
            </div>
          </form>
        </div>

        <div className="mt-24 flex justify-between gap-[56px] text-2xl text-white">
          <div className="flex flex-col">
            <h1
              className={`${outfit.className} mb-4 text-[10px] font-bold leading-[10px] tracking-[0.6px] text-[#999999]`}
            >
              SHOP
            </h1>
            <ul className="list-none space-y-4">
              {/* <li
                className={`${firaMono2.className} text-[16px] leading-[16px] tracking-[0.6px] text-[#F7F7F4]`}
              >
                T-shirt
              </li>
              <li
                className={`${firaMono2.className} text-[16px] leading-[16px] tracking-[0.6px] text-[#F7F7F4]`}
              >
                Hoodies
              </li> */}
              <li
                className={`${firaMono2.className} text-[16px] leading-[16px] tracking-[0.6px] text-[#F7F7F4]`}
              >
                Shirts
              </li>

              <li
                className={`${firaMono2.className} text-[16px] leading-[16px] tracking-[0.6px] text-[#F7F7F4]`}
              >
                Caps
              </li>
            </ul>
          </div>
          <div className="flex flex-col">
            <h1
              className={`${outfit.className} mb-4 text-[10px] font-bold leading-[10px] tracking-[0.6px] text-[#999999]`}
            >
              HELP
            </h1>
            <ul className="list-none space-y-4">
              <li
                className={`${firaMono2.className} text-[16px] leading-[16px] tracking-[0.6px] text-[#F7F7F4]`}
              >
                Contact Us
              </li>
              <li
                className={`${firaMono2.className} text-[16px] leading-[16px] tracking-[0.6px] text-[#F7F7F4]`}
              >
                Shipping & Payment
              </li>
              <li
                className={`${firaMono2.className} text-[16px] leading-[16px] tracking-[0.6px] text-[#F7F7F4]`}
              >
                Returns & Exchanges
              </li>
              <li
                className={`${firaMono2.className} text-[16px] leading-[16px] tracking-[0.6px] text-[#F7F7F4]`}
              >
                Track Your Order
              </li>
              <li
                className={`${firaMono2.className} text-[16px] leading-[16px] tracking-[0.6px] text-[#F7F7F4]`}
              >
                FAQs
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-6 flex flex-col">
          <h1
            className={`${outfit.className} mb-4 text-[10px] font-bold leading-[10px] tracking-[0.6px] text-[#999999]`}
          >
            CONNECT
          </h1>
          <ul className="list-none space-y-4">
            <li
              className={`${firaMono2.className} text-[16px] leading-[16px] tracking-[0.6px] text-[#F7F7F4]`}
            >
              Instagram
            </li>
            <li
              className={`${firaMono2.className} text-[16px] leading-[16px] tracking-[0.6px] text-[#F7F7F4]`}
            >
              Facebook
            </li>
          </ul>
        </div>

        <section className="mt-24">
          <div className="flex flex-col items-center">
            <Image
              height="54"
              width="386"
              alt=""
              src="/codebrwn.svg"
              priority
              className="mr-2 mt-1"
            />

            <div className="mt-9 flex w-full justify-between">
              <span
                className={`${firaMono2.className} flex items-center justify-center text-[10px] leading-[10px] tracking-[0.6px] text-[#F7F7F4]`}
              >
                Terms & Conditions
              </span>
              <span
                className={`${firaMono2.className} flex items-center justify-center text-[10px] leading-[10px] tracking-[0.6px] text-[#F7F7F4]`}
              >
                Privacy Policy
              </span>
              <span
                className={`${firaMono2.className} flex items-center justify-center text-[10px] leading-[10px] tracking-[0.6px] text-[#F7F7F4]`}
              >
                @2024, CODEBRWN
              </span>
            </div>
          </div>
        </section>
      </footer>

      {/* DESKTOP VIEW */}
      <footer className="mt-[136px] hidden h-[559px] gap-[80px] overflow-hidden bg-[#4C000A] px-16 py-14 lg:block">
        <section className="mt-6 flex justify-between">
          <div className="flex flex-col">
            <h1
              className={`${outfit.className} mb-4 text-[10px] font-bold leading-[10px] tracking-[0.6px] text-[#999999]`}
            >
              SHOP
            </h1>
            <ul className="list-none space-y-4">
              {/* <li
                className={`${firaMono2.className} text-[16px] leading-[16px] tracking-[0.6px] text-[#F7F7F4]`}
              >
                T-shirt
              </li>
              <li
                className={`${firaMono2.className} text-[16px] leading-[16px] tracking-[0.6px] text-[#F7F7F4]`}
              >
                Hoodies
              </li> */}
              <li
                className={`${firaMono2.className} text-[16px] leading-[16px] tracking-[0.6px] text-[#F7F7F4]`}
              >
                Shirts
              </li>

              <li
                className={`${firaMono2.className} text-[16px] leading-[16px] tracking-[0.6px] text-[#F7F7F4]`}
              >
                Caps
              </li>
            </ul>
          </div>

          <div className="flex flex-col">
            <h1
              className={`${outfit.className} mb-4 text-[10px] font-bold leading-[10px] tracking-[0.6px] text-[#999999]`}
            >
              HELP
            </h1>
            <ul className="list-none space-y-4">
              <li
                className={`${firaMono2.className} text-[16px] leading-[16px] tracking-[0.6px] text-[#F7F7F4]`}
              >
                Contact Us
              </li>
              <li
                className={`${firaMono2.className} text-[16px] leading-[16px] tracking-[0.6px] text-[#F7F7F4]`}
              >
                Shipping & Payment
              </li>
              <li
                className={`${firaMono2.className} text-[16px] leading-[16px] tracking-[0.6px] text-[#F7F7F4]`}
              >
                Returns & Exchanges
              </li>
              <li
                className={`${firaMono2.className} text-[16px] leading-[16px] tracking-[0.6px] text-[#F7F7F4]`}
              >
                Track your order
              </li>
              <li
                className={`${firaMono2.className} text-[16px] leading-[16px] tracking-[0.6px] text-[#F7F7F4]`}
              >
                FAQs
              </li>
            </ul>
          </div>
          <div className="flex flex-col">
            <h1
              className={`${outfit.className} mb-4 text-[10px] font-bold leading-[10px] tracking-[0.6px] text-[#999999]`}
            >
              CONNECT
            </h1>
            <ul className="list-none space-y-4">
              <li
                className={`${firaMono2.className} text-[16px] leading-[16px] tracking-[0.6px] text-[#F7F7F4]`}
              >
                Instagram
              </li>
              <li
                className={`${firaMono2.className} text-[16px] leading-[16px] tracking-[0.6px] text-[#F7F7F4]`}
              >
                Facebook
              </li>
            </ul>
          </div>
          <div className="flex flex-col justify-start">
            <h1
              className={`${outfit.className} mb-4 text-[10px] font-bold leading-[10px] tracking-[0.6px] text-[#999999]`}
            >
              SUBSCRIBE TO OUR NEWSLETTER
            </h1>
            <p
              className={`${fira_mono.className} h-[48px] w-[468px] text-[12px] leading-[15.6px] tracking-[-0.5px] text-[#FFFFFF]`}
            >
              By entering your email address below, you consent to receiving our
              newsletter with access to our latest collections, events &
              initiatives. More details on this are provided in our{" "}
              <u>Privacy Policy.</u>
            </p>

            <form>
              <div className="mt-2 flex h-[50px] items-center border-b-[1.18px] border-[#FFFFFF] bg-[#4C000A]">
                <input
                  className={`${roboto.className} w-full bg-[#4C000A] px-2 py-0 text-[16px] leading-[19.2px] text-white outline-none`}
                  id="email"
                  type="email"
                  placeholder="Email"
                />
                {/* <button> */}
                <Image
                  height="20"
                  width="19"
                  alt=""
                  src="/eparrowup@2x.png"
                  priority
                  className="mr-2 mt-1"
                />
                {/* </button> */}
              </div>
            </form>
          </div>
        </section>

        <section className="mt-[172px] flex justify-between">
          <Image
            height="54"
            width="386"
            alt=""
            src="/codebrwn.svg"
            priority
            className="mr-2 mt-1"
          />

          <div className="mt-9 flex gap-[42px]">
            <span
              className={`${firaMono2.className} flex items-center justify-center text-[10px] leading-[10px] tracking-[0.6px] text-[#F7F7F4]`}
            >
              Terms & Conditions
            </span>
            <span
              className={`${firaMono2.className} flex items-center justify-center text-[10px] leading-[10px] tracking-[0.6px] text-[#F7F7F4]`}
            >
              Privacy Policy
            </span>
            <span
              className={`${firaMono2.className} flex items-center justify-center text-[10px] leading-[10px] tracking-[0.6px] text-[#F7F7F4]`}
            >
              @2024, CODEBRWN
            </span>
          </div>
        </section>
      </footer>
    </>
  );
};

export default Footer;
