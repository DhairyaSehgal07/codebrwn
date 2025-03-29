"use client";
import { useState, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Customer, WishlistItem, OldWishlistData } from "@/utils/types";
import { Fira_Mono } from "next/font/google";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { headers } from "@/utils/const";
import { outfit } from "@/app/fonts";
import { throttle } from "lodash";
import { useWishlist } from "@/hooks/useWishlist";

const fira_mono = Fira_Mono({ weight: "500", subsets: ["latin"] });

export const AddToWishlistSidebar = ({
  session,
  item,
}: {
  session: Customer;
  item: WishlistItem;
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
        headers: {
          "Content-Type": "application/json",
          // Add any other necessary headers here
        },
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

    onMutate: async (wishlistItem: WishlistItem) => {
      console.log("Optimistic Wishlist Update Starting");

      await queryClient.cancelQueries({ queryKey: ["wishlist"] });

      const previousWishlist = queryClient.getQueryData<OldWishlistData>([
        "wishlist",
      ]);
      console.log("Previous wishlist is: ", previousWishlist);

      let updatedWishlistItems;
      if (previousWishlist?.wishlist) {
        const existingItem = previousWishlist.wishlist.items.find(
          (item: WishlistItem) => item.id === wishlistItem.id,
        );

        if (existingItem) {
          updatedWishlistItems = previousWishlist.wishlist.items.filter(
            (item: WishlistItem) => item.id !== wishlistItem.id,
          );
        } else {
          updatedWishlistItems = [
            ...previousWishlist.wishlist.items,
            wishlistItem,
          ];
        }

        const updatedWishlistData: OldWishlistData = {
          ...previousWishlist,
          wishlist: {
            ...previousWishlist.wishlist,
            items: updatedWishlistItems,
          },
        };

        console.log("Optimistic Wishlist Update Data:", updatedWishlistData);
        queryClient.setQueryData(["wishlist"], updatedWishlistData);

        // Update local state to reflect the new wishlist state
        setIsInWishlist(!existingItem);

        return { previousWishlist };
      }

      return { previousWishlist };
    },

    onError: (error, wishlistItem, context) => {
      console.error("Mutation Error:", error);
      queryClient.setQueryData(["wishlist"], context?.previousWishlist);
      setMessage(
        "An error occurred while adding/removing the item to/from the wishlist.",
      );
      setIsLoading(false); // Reset loading state on error
    },

    onSettled: () => {
      console.log("Wishlist Mutation Settled");
      queryClient.refetchQueries({ queryKey: ["wishlist"] });
      setIsLoading(false); // Reset loading state when mutation settles
    },
  });

  const handleAddToWishlist = async (selectedProduct: WishlistItem) => {
    if (!session) {
      router.push("/auth/sign-in");
      return;
    }
    setIsLoading(true); // Set loading state to true when the mutation starts
    mutation.mutate(selectedProduct);
  };

  // Create a throttled version of handleAddToWishlist
  const throttledHandleAddToWishlist = useCallback(
    throttle(handleAddToWishlist, 1000),
    [session, router, mutation],
  );

  return (
    <>
      {isInWishlist ? (
        <button
          onClick={() => throttledHandleAddToWishlist(item)}
          className={`${outfit.className} text-xs font-semibold leading-[19px] tracking-[0.3px] underline sm:text-base`}
          disabled={isLoading} // Disable button while loading
        >
          {isLoading ? "Processing..." : "Remove from wishlist"}
        </button>
      ) : (
        <button
          onClick={() => throttledHandleAddToWishlist(item)}
          className={`${outfit.className} text-xs font-semibold leading-[19px] tracking-[0.3px] underline sm:text-base`}
          disabled={isLoading} // Disable button while loading
        >
          {isLoading ? "Processing..." : "Add to wishlist"}
        </button>
      )}
      {message && <div className="error-message">{message}</div>}{" "}
      {/* Display error message */}
    </>
  );
};

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

    onMutate: async (wishlistItem: WishlistItem) => {
      console.log("Optimistic Wishlist Update Starting");

      await queryClient.cancelQueries({ queryKey: ["wishlist"] });

      const previousWishlist = queryClient.getQueryData<OldWishlistData>([
        "wishlist",
      ]);
      console.log("Previous wishlist is: ", previousWishlist);

      let updatedWishlistItems;
      if (previousWishlist?.wishlist) {
        const existingItem = previousWishlist.wishlist.items.find(
          (item: WishlistItem) => item.id === wishlistItem.id,
        );

        if (existingItem) {
          updatedWishlistItems = previousWishlist.wishlist.items.filter(
            (item: WishlistItem) => item.id !== wishlistItem.id,
          );
        } else {
          updatedWishlistItems = [
            ...previousWishlist.wishlist.items,
            wishlistItem,
          ];
        }

        const updatedWishlistData: OldWishlistData = {
          ...previousWishlist,
          wishlist: {
            ...previousWishlist.wishlist,
            items: updatedWishlistItems,
          },
        };

        console.log("Optimistic Wishlist Update Data:", updatedWishlistData);
        queryClient.setQueryData(["wishlist"], updatedWishlistData);

        // Update local state to reflect the new wishlist state
        setIsInWishlist(!existingItem);

        return { previousWishlist };
      }

      return { previousWishlist };
    },

    onError: (error, wishlistItem, context) => {
      console.error("Mutation Error:", error);
      queryClient.setQueryData(["wishlist"], context?.previousWishlist);
      setMessage(
        "An error occurred while adding/removing the item to/from the wishlist.",
      );
    },

    onSettled: () => {
      console.log("Wishlist Mutation Settled");
      queryClient.refetchQueries({ queryKey: ["wishlist"] });
    },
  });

  const handleAddToWishlist = async (selectedProduct: WishlistItem) => {
    if (!session) {
      router.push("/auth/sign-in");
      return;
    }
    setIsLoading(false);
    mutation.mutate(selectedProduct);
  };

  // Create a throttled version of handleAddToWishlist
  const throttledHandleAddToWishlist = useCallback(
    throttle(handleAddToWishlist, 1000),
    [session, router, mutation],
  );

  // Conditionally render the button based on isInWishlist
  return (
    <>
      {isInWishlist ? (
        <button
          onClick={() => throttledHandleAddToWishlist(item)}
          className="w-full border bg-black py-4 text-white"
        >
          <span
            className={`${fira_mono.className} leading[14.4px] text-sm tracking-spaced-06 text-white`}
          >
            {isLoading ? "PROCESSING..." : "REMOVE FROM WISHLIST"}
          </span>
        </button>
      ) : (
        <button
          onClick={() => throttledHandleAddToWishlist(item)}
          className="w-full border bg-black py-4"
        >
          <span
            className={`${fira_mono.className} leading[14.4px] text-sm tracking-spaced-06 text-white`}
          >
            {isLoading ? "PROCESSING..." : "ADD TO WISHLIST"}
          </span>
        </button>
      )}
    </>
  );
};

export default AddToWishlistButton;
