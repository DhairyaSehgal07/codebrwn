import React from "react";
import dynamic from "next/dynamic";
import { useWishlist } from "@/hooks/useWishlist";
import { SkeletonDemo } from "../common/loading-skeletons/mobile-nav-skeleton";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import Link from "next/link";

const Authenticated = () => {
  const router = useRouter();
  const { data, isLoading, error } = useWishlist();

  if (isLoading) return <SkeletonDemo />;
  if (error) return <div>Error loading wishlist</div>;

  return (
    <>
      {data?.wishlist ? (
        <>
          <button onClick={() => router.push("/user/wishlist")}>
            WISHLIST[{data.wishlist.items.length}]
          </button>
        </>
      ) : (
        <> WISHLIST</>
      )}
    </>
  );
};

const Wishlist = () => {
  const router = useRouter();
  const auth = Cookies.get("auth_status");

  if (!auth) {
    // If auth_status is not present, show default content
    return (
      <button onClick={() => router.push("/auth/sign-in")}>WISHLIST</button>
    );
  }

  return <Authenticated />;
};

// Dynamically import the Wishlist component with SSR disabled
export default dynamic(() => Promise.resolve(Wishlist), { ssr: false });
