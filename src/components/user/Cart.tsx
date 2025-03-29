import dynamic from "next/dynamic";
import { useCart } from "@/hooks/useCart";
import { SkeletonDemo } from "../common/loading-skeletons/mobile-nav-skeleton";
import Cookies from "js-cookie";
import CartSidebar from "../CartSidebar";

const Authenticated = () => {
  const { data, isLoading, error } = useCart();

  if (isLoading) return <SkeletonDemo />;
  if (error) return <div>Error loading cart</div>;

  return (
    <>
      <CartSidebar data={data} />
    </>
  );
};

const Cart = () => {
  const auth = Cookies.get("auth_status");

  if (!auth) {
    return <span>CART[0]</span>;
  }

  return <Authenticated />;
};

// Dynamically import the Cart component with SSR disabled
export default dynamic(() => Promise.resolve(Cart), { ssr: false });
