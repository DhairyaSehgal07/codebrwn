import React from "react";
import Image from "next/image";
import { outfit } from "@/app/fonts";
import { Fira_Mono } from "next/font/google";

const fira_mono = Fira_Mono({ weight: "500", subsets: ["latin"] });

interface CollectionProps {
  title: string;
  description: string;
}

const Collection = ({ title, description }: CollectionProps) => {
  const imageUrl =
    "https://utfs.io/f/bcbe421f-d094-4279-9d72-ff6311a481bd-4rr376.png";
  return (
    <>
      {/*MOBILE VIEW */}
      <section className="mt-16 lg:hidden">
        <div className="relative h-[860px] w-full">
          <Image
            src={imageUrl}
            alt=""
            fill={true}
            style={{ objectFit: "cover" }}
            quality={100}
            priority
          />
          <div className="absolute left-0 right-0 top-[490px] flex items-center justify-center">
            <div className="flex h-[367px] w-full flex-col items-center">
              {/* <h1 className="text-3xl font-bold">hello</h1> */}
              <span
                className={`${outfit.className} mt-16 text-sm leading-[14.4px] tracking-[0.6px] text-[#999999]`}
              >
                {title}
              </span>
              <span
                className={`mt-[26px] ${outfit.className} h-[104px] w-[310px] text-center text-[20px] leading-[26px] tracking-[0.6px] text-[#FFFFFF]`}
              >
                {description}
              </span>
              <button className="mt-[48px] flex h-[54px] w-[120px] items-center justify-center gap-[8px] border-[1px] border-[#F7F7F4] px-6 py-4">
                <p
                  className={`${fira_mono.className} items-center text-sm leading-[14.4px] tracking-[0.6px] text-[#F7F7F4]`}
                >
                  DISCOVER
                </p>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/*DESKTOP VIEW */}
      <section className="mt-16 hidden lg:block">
        <div className="relative h-[860px] w-full">
          <Image
            src={imageUrl}
            alt=""
            fill={true}
            style={{ objectFit: "cover" }}
            quality={100}
            priority
          />
          <div className="absolute left-0 right-0 top-[490px] flex items-center justify-center">
            <div className="flex h-[367px] w-full flex-col items-center">
              <span
                className={`${outfit.className} mt-16 text-center text-[14px] leading-[16.8px] tracking-[0.6px] text-[#999999]`}
              >
                {title}
              </span>
              <span className="mt-[26px] h-[62px] w-[696px] items-center text-center text-[24px] leading-[31.2px] tracking-[0.6px] text-[#FFFFFF]">
                {description}
              </span>
              <button className="mt-[48px] flex h-[54px] w-[124px] items-center justify-center gap-[8px] border-[1px] border-[#F7F7F4] px-6 py-4">
                <p
                  className={`${fira_mono.className} items-center text-sm leading-[14.4px] tracking-[0.6px] text-[#F7F7F4]`}
                >
                  DISCOVER
                </p>
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Collection;
