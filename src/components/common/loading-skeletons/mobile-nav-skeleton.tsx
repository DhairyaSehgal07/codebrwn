import { Skeleton } from "@/components/ui/skeleton";

export function SkeletonDemo() {
  return (
    <div className="space-y-2">
      <Skeleton className="h-4 w-32 bg-black/50 lg:w-14 lg:bg-white" />
    </div>
  );
}
