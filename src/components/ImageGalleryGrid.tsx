import React from "react";
import "./scroll-style.css"; // Import the custom CSS file
import Image from "next/image";
import { ProductImage } from "@/utils/types";

const placeholderImage = "/product-image-placeholder.svg";

const ImageGalleryGrid = ({ images }: { images: ProductImage[] }) => {
  const elements = [];
  let index = 0;
  let row = 0;

  while (index < images.length) {
    // Determine how many divs should be in the current row
    const numDivsInRow = row % 2 === 0 ? 2 : 1;

    for (let i = 0; i < numDivsInRow; i++) {
      if (index >= images.length) break; // Exit if no more images

      elements.push(
        <div
          key={index}
          className={`relative flex aspect-[3/4] items-center justify-center ${
            numDivsInRow === 2 ? "col-span-1" : "col-span-2"
          } `}
        >
          <Image
            src={images[index].url || placeholderImage} // Use image URL or fallback to placeholder
            alt={`Product image ${index + 1}`}
            fill={true}
            style={{ objectFit: "cover" }}
            quality={100}
            priority
          />
        </div>,
      );
      index++;
    }

    row++; // Move to the next row
  }

  return (
    <div className="scroll-container w-full overflow-x-auto border">
      <div className="grid grid-cols-2 gap-1">{elements}</div>
    </div>
  );
};

export default ImageGalleryGrid;
