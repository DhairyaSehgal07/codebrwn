"use client";
import { useQuery } from "@tanstack/react-query";

export function useCart() {
  return useQuery({
    queryKey: ["cart"],
    queryFn: async () => {
      return fetch("/api/cart").then((res) => {
        if (res.status == 500) {
          throw new Error("Failed to fetch cart data");
        }

        return res.json();
      });
    },
  });
}
