"use client";
import { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SheetProvider } from "@/context/SheetContext";

const queryClient = new QueryClient();

export const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <SheetProvider>{children}</SheetProvider>
    </QueryClientProvider>
  );
};
