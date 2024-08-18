"use client";
import { useQuery } from "@tanstack/react-query";

export function useWishlist() {
  return useQuery({
    queryKey: ["wishlist"],
    queryFn: async () => {
      return fetch("/api/wishlist").then((res) => {
        if (res.status == 500) {
          throw new Error("Failed to fetch cart data");
        }
        return res.json();
      });
    },
  });
}
