import { useRef } from "react";
import dynamic from "next/dynamic";
import { useCart } from "@/hooks/useCart";
import { SkeletonDemo } from "../common/loading-skeletons/mobile-nav-skeleton";
import Cookies from "js-cookie";
import { CartItem } from "@/utils/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "../ui/card";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Image from "next/image";

const placeholderImage = "/product-image-placeholder.svg";

const Authenticated = () => {
  const { data, isLoading, error } = useCart();
  const sheetRef = useRef();

  if (isLoading) return <SkeletonDemo />;
  if (error) return <div>Error loading cart</div>;

  let items = [];

  if (data && data.cart && data.cart.cartInfo && data.cart.cartInfo.items) {
    items = data.cart.cartInfo.items;
  }

  // Calculate the total quantity of items in the cart
  const totalItemsInBag = items.reduce((total: number, item: CartItem) => {
    return total + item.quantity;
  }, 0);

  return (
    <>
      <Sheet>
        <SheetTrigger className="relative">
          {data?.success ? <>{`CART[${totalItemsInBag}]`}</> : <>CART[0]</>}
        </SheetTrigger>
        <SheetContent className="flex flex-col bg-white">
          <div className="flex-1 overflow-y-auto">
            <SheetHeader className="mt-10 border-b">
              <SheetTitle>Cart Summary</SheetTitle>
            </SheetHeader>
            <SheetDescription className="mt-4">
              <Card className="flex gap-4">
                <section className="flex flex-col bg-blue-200">
                  <div
                    style={{
                      width: "140px",
                      height: "160px",
                      position: "relative",
                    }}
                  >
                    <Image
                      src={placeholderImage}
                      alt="Picture of the author"
                      fill={true}
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                </section>

                <section className="flex h-full w-full flex-col">
                  <div className="flex w-full justify-between bg-green-300">
                    <span>POWERLESS INFLUENCE</span>
                    <span>RS 5000</span>
                  </div>
                </section>
              </Card>
            </SheetDescription>
          </div>
          <SheetFooter>
            <SheetClose asChild>
              <Button type="submit">Save changes</Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
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
