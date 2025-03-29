import Loader from "@/components/common/Loader";
import { ProductSkeleton } from "@/components/common/loading-skeletons/ProductSkeleton";
import Navbar from "@/components/common/Navbar";
import SingleProductScreen from "@/screens/SingleProductScreen";
import React, { Suspense } from "react";

// Define the type for the params
interface PageParams {
  params: {
    slug: string[];
  };
}

const page = ({ params }: PageParams) => {
  return (
    <>
      <Suspense fallback={<Loader />}>
        <SingleProductScreen handle={params.slug[0]} />
      </Suspense>
    </>
  );
};

export default page;
