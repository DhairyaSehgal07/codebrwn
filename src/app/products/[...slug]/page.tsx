import Navbar from "@/components/common/Navbar";
import React from "react";

// Define the type for the params
interface PageParams {
  params: {
    slug: string[];
  };
}

const page = ({ params }: PageParams) => {
  return (
    <>
      <Navbar />
      <h1 className="text-2xl">This is product page</h1>
    </>
  );
};

export default page;
