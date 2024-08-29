import Image from "next/image";
import { outfit } from "@/app/fonts";

const placeholderImage = "/product-image-placeholder.svg";

const HeroBackground = ({ heading }: { heading: string }) => {
  return (
    <>
      <div className="relative h-[383px] w-full lg:h-[655px]">
        <Image
          src={placeholderImage}
          alt=""
          fill={true}
          style={{ objectFit: "cover" }}
          quality={100}
          priority
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1
            className={`text-[48px] text-black lg:text-[64px] lg:leading-[76.8px] ${outfit.className}`}
          >
            {heading}
          </h1>
        </div>
      </div>
    </>
  );
};

export default HeroBackground;
