"use client";
import { useState, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Customer, WishlistItem } from "@/utils/types";
import { Fira_Mono } from "next/font/google";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { headers } from "@/utils/const";
import { throttle } from "lodash";
import { useWishlist } from "@/hooks/useWishlist";

const fira_mono = Fira_Mono({ weight: "500", subsets: ["latin"] });

const AddToWishlistButton = ({
  item,
  session,
}: {
  item: WishlistItem;
  session: Customer;
}) => {
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isInWishlist, setIsInWishlist] = useState(false);
  const queryClient = useQueryClient();
  const router = useRouter();

  // Fetch the wishlist data
  const { data: wishlistData, isLoading: wishlistLoading } = useWishlist();

  // Check if the item is in the wishlist when the wishlist data is available
  useEffect(() => {
    if (!wishlistLoading && wishlistData?.wishlist) {
      const exists = wishlistData.wishlist.items.some(
        (wishlistItem: WishlistItem) => wishlistItem.id === item.id,
      );
      setIsInWishlist(exists);
    }
  }, [wishlistData, wishlistLoading, item.id]);

  const mutation = useMutation({
    mutationFn: async (wishlistItem: WishlistItem) => {
      const response = await fetch("/api/wishlist", {
        method: "POST",
        headers: headers,
        body: JSON.stringify({
          customerId: session.id,
          item: wishlistItem,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update wishlist");
      }
      return response.json();
    },

    onError: (error) => {
      console.error("Mutation Error:", error);
      setMessage(
        "An error occurred while adding/removing the item to/from the wishlist.",
      );
      setIsLoading(false); // Reset loading state on error
    },

    onSuccess: () => {
      console.log("Wishlist Mutation Successful");
      setIsLoading(false); // Reset loading state on success
      router.refresh(); // Reload the page
    },

    onSettled: () => {
      console.log("Wishlist Mutation Settled");
      setIsLoading(false); // Ensure loading state is reset after mutation
      queryClient.refetchQueries({ queryKey: ["wishlist"] });
    },
  });

  const handleAddToWishlist = async (selectedProduct: WishlistItem) => {
    if (!session) {
      router.push("/auth/sign-in");
      return;
    }
    setIsLoading(true);
    mutation.mutate(selectedProduct);
  };

  // Create a throttled version of handleAddToWishlist
  const throttledHandleAddToWishlist = useCallback(
    throttle(handleAddToWishlist, 1000),
    [session, router, mutation],
  );

  // Conditionally render the button based on isInWishlist
  return (
    <div className="flex items-center justify-center">
      {isInWishlist ? (
        <button
          onClick={() => throttledHandleAddToWishlist(item)}
          className={`w-1/2 border py-4 transition-colors duration-200 ${
            isLoading
              ? "bg-black text-white"
              : "border-black bg-white text-black hover:bg-black hover:text-white"
          }`}
        >
          <span
            className={`${fira_mono.className} leading[14.4px] text-sm tracking-spaced-06`}
          >
            {isLoading ? "REMOVING..." : "REMOVE"}
          </span>
        </button>
      ) : (
        <button
          onClick={() => throttledHandleAddToWishlist(item)}
          className={`w-1/2 border py-4 transition-colors duration-200 ${
            isLoading
              ? "bg-black text-white"
              : "border-black bg-white text-black hover:bg-black hover:text-white"
          }`}
        >
          <span
            className={`${fira_mono.className} leading[14.4px] text-sm tracking-spaced-06`}
          >
            {isLoading ? "PROCESSING..." : "ADD TO WISHLIST"}
          </span>
        </button>
      )}
    </div>
  );
};

export default AddToWishlistButton;
