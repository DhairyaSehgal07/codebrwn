import Image from "next/image";
import { outfit } from "@/app/fonts";

const placeholderImage = "/product-image-placeholder.svg";

const HeroBackground = ({
  heading,
  imageUrl,
}: {
  heading: string;
  imageUrl: string;
}) => {
  return (
    <>
      <div className="relative hidden h-[383px] w-full lg:block lg:h-[655px]">
        <Image
          src={imageUrl || placeholderImage}
          alt=""
          fill={true}
          style={{ objectFit: "contain" }}
          quality={100}
          priority
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1
            className={`text-[48px] text-[#F7F7F4] lg:text-[64px] lg:leading-[76.8px] ${outfit.className}`}
          >
            {heading}
          </h1>
        </div>
      </div>

      <div className="relative h-[383px] w-full lg:hidden lg:h-[655px]">
        <Image
          src={imageUrl || placeholderImage}
          alt=""
          fill={true}
          style={{ objectFit: "cover" }}
          quality={100}
          priority
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1
            className={`text-[48px] text-white lg:text-[64px] lg:leading-[76.8px] ${outfit.className}`}
          >
            {heading}
          </h1>
        </div>
      </div>
    </>
  );
};

export default HeroBackground;
