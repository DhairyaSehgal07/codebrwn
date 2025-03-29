import React from "react";
import Image from "next/image";
import { outfit } from "@/app/fonts";

interface SeasonProps {
  title: string;
  description: string;
}

const Season = ({ title, description }: SeasonProps) => {
  const imageUrl1 =
    "https://utfs.io/f/e63f1e76-9220-48bc-abca-544277a44e25-6mkout.jpg";
  const mobileLogo =
    "https://utfs.io/f/78001dc2-a210-461c-8e1a-716755932c8f-rntaq9.png";

  const pcLogo =
    "https://utfs.io/f/6fc03745-07e1-4788-ae03-c485ccda90b7-mmcqxi.png";
  return (
    <>
      {/*Mobile view */}
      <section className="mt-16 lg:hidden">
        <div className="relative h-[618px] w-full">
          <Image
            src={imageUrl1}
            alt=""
            fill={true}
            style={{ objectFit: "cover" }}
            quality={100}
            priority
          />
        </div>
        <div className="relative flex h-[618px] items-center justify-center bg-[#F3F1EA]">
          <div>
            <Image
              height="617"
              width="430"
              src={mobileLogo}
              alt=""
              style={{ objectFit: "cover" }}
              quality={100}
              priority
            />
          </div>
          <div className="absolute bottom-16 left-0 right-0 top-0 flex flex-col items-center justify-center">
            <h1
              className={`${outfit.className} text-sm font-bold leading-[15.6px] tracking-[0.6px] text-[#9D9D9D]`}
            >
              {title}
            </h1>

            <p
              style={{
                textAlign: "justify", // Align text evenly on both sides
                hyphens: "auto", // Enable hyphenation for better text wrapping
              }}
              className={`${outfit.className} mt-4 h-[130px] w-[370px] px-6 text-center text-xl font-normal leading-[26px] tracking-[0.6px]`}
            >
              {description}
            </p>
          </div>
        </div>
      </section>

      {/*DESKTOP VIEW*/}
      <section className="mt-16 hidden lg:flex">
        <div className="relative h-[865px] w-1/2">
          <Image
            src={imageUrl1}
            alt=""
            fill={true}
            style={{ objectFit: "cover" }}
            quality={100}
            priority
          />
        </div>

        <div className="relative h-[865px] w-1/2">
          <div className="absolute inset-0">
            <Image
              src={pcLogo}
              alt=""
              fill={true}
              style={{ objectFit: "cover" }}
              quality={100}
              priority
            />
          </div>
          <div className="absolute left-1/2 top-[361px] z-10 flex h-[144px] w-[487px] -translate-x-1/2 transform flex-col items-center justify-center text-center">
            <h2
              className={`${outfit.className} items-center text-[12px] font-bold leading-[15.6px] tracking-[0.6px] text-[#9D9D9D]`}
            >
              {title}
            </h2>
            <p
              style={{
                textAlign: "justify", // Align text evenly on both sides
                hyphens: "auto", // Enable hyphenation for better text wrapping
              }}
              className={`${outfit.className} mt-6 items-center text-[20px] leading-[26px] tracking-[0.6px] text-[#000000]`}
            >
              {description}
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default Season;
