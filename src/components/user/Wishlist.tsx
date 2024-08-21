import React from "react";
import dynamic from "next/dynamic";
import { useWishlist } from "@/hooks/useWishlist";
import { SkeletonDemo } from "../common/loading-skeletons/mobile-nav-skeleton";
import Cookies from "js-cookie";

const Authenticated = () => {
  const { data, isLoading, error } = useWishlist();

  if (isLoading) return <SkeletonDemo />;
  if (error) return <div>Error loading wishlist</div>;

  return (
    <>
      {data?.wishlist ? (
        <>WISHLIST[{data.wishlist.items.length}]</>
      ) : (
        <> WISHLIST</>
      )}
    </>
  );
};

const Wishlist = () => {
  const auth = Cookies.get("auth_status");

  if (!auth) {
    // If auth_status is not present, show default content
    return <span>WISHLIST</span>;
  }

  return <Authenticated />;
};

// Dynamically import the Wishlist component with SSR disabled
export default dynamic(() => Promise.resolve(Wishlist), { ssr: false });
