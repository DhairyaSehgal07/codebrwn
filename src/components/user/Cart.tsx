import React from "react";
import dynamic from "next/dynamic";
import { useCart } from "@/hooks/useCart";
import { SkeletonDemo } from "../common/loading-skeletons/mobile-nav-skeleton";
import Cookies from "js-cookie";

const Authenticated = () => {
  const { data, isLoading, error } = useCart();

  console.log(data);

  if (isLoading) return <SkeletonDemo />;
  if (error) return <div>Error loading cart</div>;

  return (
    <>
      {data?.success ? (
        <>{`BAG[${data.cart.cartInfo.items.length}]`}</>
      ) : (
        <>BAG</>
      )}
    </>
  );
};

const Cart = () => {
  const auth = Cookies.get("auth_status");

  if (!auth) {
    return <span>BAG</span>;
  }

  return <Authenticated />;
};

// Dynamically import the Cart component with SSR disabled
export default dynamic(() => Promise.resolve(Cart), { ssr: false });
