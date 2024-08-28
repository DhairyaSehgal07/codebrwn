"use client";
import React from "react";

const RemoveFromWishlistButton = () => {
  const [isLoading, setIsLoading] = React.useState(false);

  return (
    <>
      <main className="flex w-full items-center justify-center">
        <button
          type="submit"
          id="wishlist-button"
          className={`mt-2 w-1/2 border ${isLoading ? "bg-black text-white" : "bg-white text-black"} border-black py-4 hover:bg-black hover:text-white hover:transition-all hover:duration-300`}
        >
          <span className="text-sm leading-[14.4px] tracking-spaced-06">
            {isLoading ? "Processing..." : "Remove"}
          </span>
        </button>
      </main>
    </>
  );
};

export default RemoveFromWishlistButton;
