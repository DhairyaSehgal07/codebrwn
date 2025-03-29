import { Skeleton } from "@/components/ui/skeleton";
import Navbar from "../Navbar";

export function ProductSkeleton() {
  return (
    <>
      <Navbar />
      <main className="flex items-center justify-center">
        <div className="flex w-full max-w-7xl flex-col gap-8 p-4">
          <div className="flex flex-col gap-12 md:flex-row">
            <section className="flex justify-center md:justify-start">
              {/* Larger photo skeleton */}
              <Skeleton className="h-[738px] w-[780px] bg-gray-300" />
            </section>
            <section className="flex flex-1 flex-col space-y-6">
              <Skeleton className="h-12 w-3/4 bg-gray-400" />
              <Skeleton className="h-8 w-1/2 bg-gray-300" />

              {/* Description Skeleton */}
              <div className="space-y-4">
                <Skeleton className="h-6 w-full bg-gray-300" />
                <Skeleton className="h-6 w-full bg-gray-300" />
                <Skeleton className="h-6 w-2/3 bg-gray-300" />
              </div>
            </section>
          </div>
        </div>
      </main>
    </>
  );
}
