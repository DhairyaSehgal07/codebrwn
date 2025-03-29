"use client";
import { useQuery } from "@tanstack/react-query";

export function useSession() {
  return useQuery({
    queryKey: ["session"],
    queryFn: async () => {
      // Return the fetch call result
      return fetch("/api/session").then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch session data");
        }
        return res.json();
      });
    },
  });
}
