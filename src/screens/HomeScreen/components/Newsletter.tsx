import React from "react";
import Image from "next/image";
import { outfit, roboto, fira_mono } from "@/app/fonts";
import { Fira_Mono } from "next/font/google";

const firaMono = Fira_Mono({ weight: "500", subsets: ["latin"] });

const placeholderImage = "/product-image-placeholder.svg";

const Newsletter = () => {
  const newsLetterUrl =
    "https://utfs.io/f/2fce0c8c-9cec-4307-a482-4574ff1afd6d-i8g3ax.jpeg";
  return (
    <>
      {/*MOBILE VIEW */}
      <main className="mt-16 px-6 lg:hidden">
        <div className="relative h-[534px] w-full">
          <picture>
            <Image
              src={newsLetterUrl || placeholderImage}
              alt=""
              fill={true}
              style={{ objectFit: "cover" }}
              quality={100}
              priority
            />
          </picture>
        </div>
        <div className="mt-16 flex flex-col items-center">
          <h1
            className={`${outfit.className} mr-1 text-[40px] leading-[52px] tracking-[0.6px]`}
          >
            JOIN THE CLUB
          </h1>
          <p
            className={`${fira_mono.className} mt-4 h-[69px] w-[376px] text-center text-[18px] leading-[23.4px] tracking-[0.6px] text-[#8E8E8E]`}
          >
            {
              "Sign up to join the CodeBrwn Club for exclusive content, events, promotions and more."
            }
          </p>

          <div className="mt-[56px] flex w-full items-center justify-center">
            <div className="w-full max-w-sm rounded">
              <form>
                <div>
                  <input
                    className={`${roboto.className} h-[50px] w-full border-b-[1.18px] border-r-0 border-[#000000] px-2 py-4 text-[16px] leading-[19.2px]`}
                    id="name"
                    type="text"
                    placeholder="Name"
                  />
                </div>
                <div>
                  <input
                    className={`${roboto.className} mt-8 h-[50px] w-full border-b-[1.18px] border-r-0 border-[#000000] px-2 py-4 text-[16px] leading-[19.2px]`}
                    id="email"
                    type="email"
                    placeholder="Email"
                  />
                </div>
                <div className="flex items-center justify-center">
                  <button
                    className="mt-14 flex h-[52px] w-[114px] items-center justify-center border-[1.18px] border-black px-[28px] py-[19px] text-center"
                    type="button"
                  >
                    <p
                      className={`${fira_mono.className} text-center text-[12px] leading-[14.4px] tracking-[0.6px] text-black`}
                    >
                      SIGN UP
                    </p>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>

      {/*DESKTOP VIEW*/}
      <main className="mt-16 hidden px-16 lg:block">
        <div className="flex h-[744px]">
          <div className="relative h-[744px] w-[50%]">
            <picture>
              <Image
                src={newsLetterUrl}
                alt=""
                fill={true}
                style={{ objectFit: "cover" }}
                quality={100}
                priority
              />
            </picture>
          </div>
          <div className="flex w-[50%] items-center justify-center bg-[#F3F1EA] px-[109px] py-[163px]">
            <div className="flex h-[418px] w-[580px] flex-col items-center">
              <h1
                className={`${outfit.className} whitespace-nowrap text-center text-[40px] leading-[52px] tracking-[0.6px] text-[#000000]`}
              >
                JOIN THE CLUB
              </h1>
              <p
                className={`${firaMono.className} mt-[20.65px] text-center text-[18px] leading-[23.4px] tracking-[0.6px] text-[#8E8E8E]`}
              >
                {
                  "Sign up to join the CodeBrwn Club for exclusive content, events, promotions and more."
                }
              </p>
              <div className="mt-[56px] flex w-full items-center justify-center">
                <div className="w-full rounded">
                  <form>
                    <div>
                      <input
                        className={`${roboto.className} h-[50px] w-full border-b-[1.18px] border-r-0 border-[#000000] bg-[#F3F1EA] px-2 py-4 text-[16px] leading-[19.2px]`}
                        id="name"
                        type="text"
                        placeholder="Name"
                      />
                    </div>
                    <div>
                      <input
                        className={`${roboto.className} mt-8 h-[50px] w-full border-b-[1.18px] border-r-0 border-[#000000] bg-[#F3F1EA] px-2 py-4 text-[16px] leading-[19.2px]`}
                        id="email"
                        type="email"
                        placeholder="Email"
                      />
                    </div>
                    <div className="flex items-center justify-center">
                      <button
                        className="mt-14 flex h-[52px] w-[114px] items-center justify-center border-[1.18px] border-black px-[28px] py-[19px] text-center transition-all duration-300 hover:bg-black/80 hover:text-white"
                        type="button"
                      >
                        <p
                          className={`${fira_mono.className} text-center text-[12px] leading-[14.4px] tracking-[0.6px]`}
                        >
                          SIGN UP
                        </p>
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Newsletter;
