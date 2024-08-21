"use client";
import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import Image from "next/image";

const placeholderImage = "/product-image-placeholder.svg";
import { ProductImage } from "@/utils/types";

export function ProductCarousel({ images }: { images: ProductImage[] }) {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);

  const updateCarouselState = React.useCallback(() => {
    if (!api) return;

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);
  }, [api]);

  React.useEffect(() => {
    if (!api) return;

    updateCarouselState(); // Initial state setup

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });

    // Add resize event listener
    const handleResize = () => {
      updateCarouselState();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [api, updateCarouselState]);

  const handleDotClick = (index: number) => {
    if (api) {
      api.scrollTo(index); // Navigate to the selected slide
    }
  };

  return (
    <div className="relative lg:hidden">
      <Carousel setApi={setApi} className="w-full">
        <CarouselContent>
          {images.map((image, index) => (
            <CarouselItem key={image.id}>
              <Card className="rounded-none">
                <CardContent className="relative flex aspect-square items-center justify-center">
                  <Image
                    src={image.url || placeholderImage}
                    alt={`Product Image ${index + 1}`}
                    fill={true}
                    style={{ objectFit: "cover" }}
                    quality={100}
                    priority
                  />
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="lg:mx-14" />
        <CarouselNext className="lg:mx-14" />
      </Carousel>
      <div className="absolute bottom-8 flex w-full justify-center space-x-3">
        {Array.from({ length: count }).map((_, index) => (
          <div
            key={index}
            className={`h-3 w-3 cursor-pointer rounded-full ${
              current - 1 === index ? "bg-black" : "bg-[#E1E1E1]"
            }`}
            onClick={() => handleDotClick(index)}
          />
        ))}
      </div>
    </div>
  );
}
