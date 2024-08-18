import Loader from "@/components/common/Loader";
import React from "react";
import { getSession } from "../actions/auth/common";
import { getCart } from "@/lib/firebase/cart";
import { getWishlist } from "@/lib/firebase/wishlist";

const page = async () => {
  const session = await getSession();
  return (
    <div className="mt-32 flex flex-col items-center justify-center">
      <div>{JSON.stringify(session)}</div>
    </div>
  );
};

export default page;
