import React from "react";
import { Fira_Mono } from "next/font/google";
import { outfit } from "@/app/fonts";
import Image from "next/image";
const firaMono = Fira_Mono({ weight: "500", subsets: ["latin"] });

const placeholderImage = "/product-image-placeholder.svg";

const Grid = () => {
  const tshirtsUrl =
    "https://utfs.io/f/7e466597-af96-46ee-a586-4d41b24722c6-1mptwr.jpeg";

  const capsUrl =
    "https://utfs.io/f/6e75901f-b271-4cdd-8bd3-3dbe6fa95e8d-1mptws.jpeg";

  const bagsUrl =
    "https://utfs.io/f/6680921f-52ba-42ca-a76c-26527dd8dca5-1mptwv.jpeg";
  return (
    <>
      {/*MOBILE VIEW */}
      <main className="mt-16 px-6 lg:hidden">
        <section className="grid grid-cols-2">
          <div className="relative h-[310px]">
            <picture>
              <Image
                src={tshirtsUrl || placeholderImage}
                alt=""
                fill={true}
                style={{ objectFit: "cover" }}
                quality={100}
                priority
              />
            </picture>
            <div className="absolute inset-0 flex justify-center">
              <div className="mt-[190px] h-[121px] w-full p-6 text-center text-white">
                <h1
                  className={`${outfit.className} text-center text-[24px] font-medium leading-[28.8px] tracking-[0.6px]`}
                >
                  T-SHIRTS
                </h1>
                <div className="mt-3 flex items-center justify-center">
                  <button
                    className={`flex h-[32px] w-[55.25px] items-center justify-center gap-[5.54px] bg-white px-[16.63px] py-[11.08px]`}
                  >
                    <div
                      className={`${firaMono.className} text-center text-[8.4px] leading-[10px] tracking-[0.6px] text-black`}
                    >
                      SHOP
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="relative h-[310px]">
            <picture>
              <Image
                src={capsUrl || placeholderImage}
                alt=""
                fill={true}
                style={{ objectFit: "cover" }}
                quality={100}
                priority
              />
            </picture>
            <div className="absolute inset-0 flex justify-center">
              <div className="mt-[190px] h-[121px] w-full p-6 text-center text-white">
                <h1
                  className={`${outfit.className} text-center text-[24px] font-medium leading-[28.8px] tracking-[0.6px]`}
                >
                  CAPS
                </h1>
                <div className="mt-3 flex items-center justify-center">
                  <button
                    className={`flex h-[32px] w-[55.25px] items-center justify-center gap-[5.54px] bg-white px-[16.63px] py-[11.08px]`}
                  >
                    <div
                      className={`${firaMono.className} text-center text-[8.4px] leading-[10px] tracking-[0.6px] text-black`}
                    >
                      SHOP
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="grid-cols-1">
          <div className="relative h-[310px]">
            <picture>
              <Image
                src={bagsUrl || placeholderImage}
                alt=""
                fill={true}
                style={{ objectFit: "cover" }}
                quality={100}
                priority
              />
            </picture>
            <div className="absolute inset-0 flex justify-center">
              <div className="mt-[190px] h-[121px] w-full p-6 text-center text-white">
                <h1
                  className={`${outfit.className} text-center text-[24px] font-medium leading-[28.8px] tracking-[0.6px]`}
                >
                  BAGS
                </h1>
                <div className="mt-3 flex items-center justify-center">
                  <button
                    className={`flex h-[32px] w-[55.25px] items-center justify-center gap-[5.54px] bg-white px-[16.63px] py-[11.08px]`}
                  >
                    <div
                      className={`${firaMono.className} text-center text-[8.4px] leading-[10px] tracking-[0.6px] text-black`}
                    >
                      SHOP
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/*DESKTOP VIEW */}

      <main className="mt-16 hidden px-16 lg:block">
        <section className="grid grid-cols-2">
          <div className="relative h-[1117px]">
            <Image
              src={tshirtsUrl}
              alt="Image 1"
              fill={true}
              objectFit="cover"
              quality={100}
              priority
            />
            <div className="absolute inset-0 flex justify-center">
              <div className="mt-[860px] h-[121px] w-full p-6 text-center text-white">
                <h1
                  className={`${outfit.className} text-center text-[56px] font-medium leading-[67.2px] tracking-[0.6px]`}
                >
                  T-SHIRTS
                </h1>
                <div className="mt-8 flex items-center justify-center">
                  <button
                    className={`flex h-[46px] w-[80px] items-center justify-center gap-[8px] bg-white px-[24px] py-[16px]`}
                  >
                    <div
                      className={`${firaMono.className} text-center text-[12px] leading-[14.4px] tracking-[0.6px] text-black`}
                    >
                      SHOP
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="relative h-[1117px]">
            <Image
              src={capsUrl}
              alt="Image 1"
              fill={true}
              objectFit="cover"
              quality={100}
              priority
            />
            <div className="absolute inset-0 flex justify-center">
              <div className="mt-[860px] h-[121px] w-full p-6 text-center text-white">
                <h1
                  className={`${outfit.className} text-center text-[56px] font-medium leading-[67.2px] tracking-[0.6px]`}
                >
                  CAPS
                </h1>
                <div className="mt-8 flex items-center justify-center">
                  <button
                    className={`flex h-[46px] w-[80px] items-center justify-center gap-[8px] bg-white px-[24px] py-[16px]`}
                  >
                    <div
                      className={`${firaMono.className} text-center text-[12px] leading-[14.4px] tracking-[0.6px] text-black`}
                    >
                      SHOP
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="grid grid-cols-1">
          <div className="relative h-[1117px]">
            <Image
              src={bagsUrl}
              alt="Image 1"
              fill={true}
              objectFit="cover"
              quality={100}
              priority
            />
            <div className="absolute inset-0 flex justify-center">
              <div className="mt-[860px] h-[121px] w-full p-6 text-center text-white">
                <h1
                  className={`${outfit.className} text-center text-[56px] font-medium leading-[67.2px] tracking-[0.6px]`}
                >
                  BAGS
                </h1>
                <div className="mt-8 flex items-center justify-center">
                  <button
                    className={`flex h-[46px] w-[80px] items-center justify-center gap-[8px] bg-white px-[24px] py-[16px]`}
                  >
                    <div
                      className={`${firaMono.className} text-center text-[12px] leading-[14.4px] tracking-[0.6px] text-black`}
                    >
                      SHOP
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Grid;