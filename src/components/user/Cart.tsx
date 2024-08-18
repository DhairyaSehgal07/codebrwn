import React from "react";
import { useCart } from "@/hooks/useCart";
import { SkeletonDemo } from "../common/loading-skeletons/mobile-nav-skeleton";
import Cookies from "js-cookie";

const Authenticated = () => {
  const { data, isLoading, error } = useCart();

  if (isLoading) return <SkeletonDemo />;
  if (error) return <div>Error loading cart</div>;

  return (
    <>
      {data?.success ? (
        <>{`BAG[${data.cart.cartInfo.items.length + 2}]`}</>
      ) : (
        <>UA BAG[0]</>
      )}
    </>
  );
};

const Cart = () => {
  const auth = Cookies.get("auth_status");

  if (!auth) {
    return <span>UA BAG[0]</span>;
  }

  return <Authenticated />;
};

export default Cart;
