import React, { useCallback } from "react";
import { outfit, fira_mono } from "@/app/fonts";
import { X, LoaderCircle } from "lucide-react";
import { CartItem } from "@/utils/types";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Image from "next/image";
import { useSession } from "@/hooks/useSession";
import { useWishlist } from "@/hooks/useWishlist";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { API_URL, headers } from "@/utils/const";
import { OldCartData } from "@/utils/types";
import { useSheet } from "@/context/SheetContext";
import { throttle } from "lodash";
import { AddToWishlistSidebar } from "./AddToWIshlistButton";
import { createCartMutation } from "@/lib/graphql/mutations";

const placeholderImage = "/product-image-placeholder.svg";

const CartSidebar = ({ data }: { data: any }) => {
  const session = useSession();
  const router = useRouter();
  const queryClient = useQueryClient();
  const { sheetTriggerRef } = useSheet();
  const [isLoading, setIsLoading] = React.useState(false);

  // const wishlist = useWishlist();
  const [message, setMessage] = React.useState("");
  const [isCheckoutDisabled, setIsCheckoutDisabled] = React.useState(false);

  {
    /* FOR UPDATE MUTATION */
  }

  const updateMutation = useMutation({
    // Define mutationFn to accept the object with cartItemId and type
    mutationFn: async ({
      cartItemId,
      type,
    }: {
      cartItemId: string;
      type: "INCREMENT" | "DECREMENT";
    }) => {
      const response = await fetch(`/api/cart`, {
        method: "PUT",
        headers: headers,
        body: JSON.stringify({
          customerId: session?.data.session.id,
          itemId: cartItemId,
          type: type,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update item quantity");
      }

      return response.json();
    },

    onMutate: async ({ cartItemId, type }) => {
      setIsLoading(true);
      await queryClient.cancelQueries({ queryKey: ["cart"] });

      const previousCart = queryClient.getQueryData<OldCartData>(["cart"]);

      if (previousCart?.cart) {
        const updatedItems = previousCart.cart.cartInfo.items.map((item) => {
          if (item.id === cartItemId) {
            const newQuantity =
              type === "INCREMENT"
                ? item.quantity + 1
                : item.quantity > 1
                  ? item.quantity - 1
                  : item.quantity; // Don't decrement if quantity is 1

            return {
              ...item,
              quantity: newQuantity,
            };
          }
          return item;
        });

        const priceDifference =
          previousCart.cart.cartInfo.items.find(
            (item) => item.id === cartItemId,
          )?.price || 0;

        const updatedCartData: OldCartData = {
          ...previousCart,
          cart: {
            ...previousCart.cart,
            cartInfo: {
              ...previousCart.cart.cartInfo,
              items: updatedItems,
              totalPrice:
                type === "INCREMENT"
                  ? previousCart.cart.cartInfo.totalPrice + priceDifference
                  : previousCart.cart.cartInfo.totalPrice - priceDifference,
            },
          },
        };

        queryClient.setQueryData(["cart"], updatedCartData);
      }

      return { previousCart };
    },

    onError: (error, variables, context) => {
      console.error("Mutation Error:", error);
      queryClient.setQueryData(["cart"], context?.previousCart);
      // Set the message
      setMessage("Something went wrong, please try again.");

      // Clear the message after 5 seconds (5000 milliseconds)
      setTimeout(() => {
        setMessage("");
      }, 5000);
    },

    onSettled: () => {
      queryClient.refetchQueries({ queryKey: ["cart"] });
      setIsLoading(false);
    },
  });

  // Original function to handle quantity updates
  const handleUpdateQuantity = (
    cartItemId: string,
    type: "INCREMENT" | "DECREMENT",
  ) => {
    updateMutation.mutate({ cartItemId, type });
  };

  // Create a throttled version of handleUpdateQuantity
  const throttledHandleUpdateQuantity = useCallback(
    throttle((cartItemId: string, type: "INCREMENT" | "DECREMENT") => {
      handleUpdateQuantity(cartItemId, type);
    }, 1000), // 1000ms (1 second) throttle delay
    [updateMutation], // Dependencies
  );

  const onUpdateQuantityClick = (
    cartItemId: string,
    type: "INCREMENT" | "DECREMENT",
  ) => {
    throttledHandleUpdateQuantity(cartItemId, type);
  };

  {
    /* FOR DELETE MUATION */
  }
  const deleteMutation = useMutation({
    mutationFn: async (cartItemId: string) => {
      const response = await fetch(`/api/cart`, {
        method: "DELETE",
        headers: headers,
        body: JSON.stringify({
          customerId: session?.data.session.id,
          itemId: cartItemId,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to remove item from cart");
      }

      return response.json();
    },

    onMutate: async (cartItemId: string) => {
      setIsLoading(true);
      // Cancel outgoing refetches so they don't overwrite our optimistic update
      await queryClient.cancelQueries({ queryKey: ["cart"] });

      // Snapshot the previous state
      const previousCart = queryClient.getQueryData<OldCartData>(["cart"]);

      // Optimistically update the cart
      if (previousCart?.cart) {
        const updatedItems = previousCart.cart.cartInfo.items.filter(
          (item: CartItem) => item.id !== cartItemId,
        );

        const removedItem = previousCart.cart.cartInfo.items.find(
          (item: CartItem) => item.id === cartItemId,
        );

        const updatedCartData: OldCartData = {
          ...previousCart,
          cart: {
            ...previousCart.cart,
            cartInfo: {
              ...previousCart.cart.cartInfo,
              items: updatedItems,
              totalPrice:
                previousCart.cart.cartInfo.totalPrice -
                (removedItem?.price || 0),
            },
          },
        };

        // Update the cache with optimistic data
        queryClient.setQueryData(["cart"], updatedCartData);
      }

      // Return context with the previous cart data
      return { previousCart };
    },
    onError: (error, cartItemId, context) => {
      console.error("Mutation Error:", error);
      // Revert to the previous state if the mutation fails
      queryClient.setQueryData(["cart"], context?.previousCart);
      // Set the message
      setMessage("Something went wrong, please try again.");

      // Clear the message after 5 seconds (5000 milliseconds)
      setTimeout(() => {
        setMessage("");
      }, 5000);
    },
    onSettled: () => {
      // Refetch the cart after the mutation
      queryClient.refetchQueries({ queryKey: ["cart"] });
      setIsLoading(false);
    },
  });

  const handleRemoveItem = async (cartItemId: string) => {
    deleteMutation.mutate(cartItemId);
  };

  const throttledHandleRemoveItem = useCallback(
    throttle(handleRemoveItem, 1000), // 1000ms (1 second) throttle delay
    [deleteMutation], // Dependencies
  );

  const onRemoveItemClick = (cartItemId: string) => {
    throttledHandleRemoveItem(cartItemId);
  };

  // Some minor calculations for ease
  let items: CartItem[] = [];

  if (data && data.cart && data.cart.cartInfo && data.cart.cartInfo.items) {
    items = data.cart.cartInfo.items;
  }

  // Calculate the total quantity of items in the cart
  const totalItemsInBag = items.reduce((total: number, item: CartItem) => {
    return total + item.quantity;
  }, 0);

  // Handle checkout function
  const handleCheckout = async (e: any) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/cart/checkout", {
        method: "POST",
        headers,
        body: JSON.stringify({
          customerId: session.data.session.id,
          items: items,
          email: session.data.session.email,
          countryCode: "IN",
        }),
      });

      if (!res.ok) {
        console.log("Some error occurred while creating checkout");
        return;
      }

      const result = await res.json();

      // Extract the checkoutUrl from the response
      const checkoutUrl = result.data?.data?.cartCreate?.cart?.checkoutUrl;

      if (checkoutUrl) {
        // Redirect to the checkout URL
        await router.push(checkoutUrl);
      } else {
        console.log("Checkout URL not found in the response");
      }

      return result;
    } catch (err: any) {
      throw new Error("Failed to create cart");
    } finally {
      setTimeout(() => {
        setIsCheckoutDisabled(false);
      }, 1000);
    }
  };

  // Throttle the handleCheckout function with a 1-second delay
  const throttledHandleCheckout = useCallback(
    throttle(handleCheckout, 5000), // 1000ms (1 second) throttle delay
    [session, items], // Dependencies
  );

  // Usage in your component
  const onCheckoutClick = (e: any) => {
    setIsCheckoutDisabled(true);
    throttledHandleCheckout(e);
  };

  return (
    <>
      <Sheet>
        <SheetTrigger ref={sheetTriggerRef} className="relative">
          {data?.success ? `CART[${totalItemsInBag}]` : "CART[0]"}
        </SheetTrigger>
        <SheetContent
          side={"right"}
          className="flex h-full flex-col overflow-y-auto bg-white"
        >
          <div className="flex-1 overflow-y-auto">
            <SheetHeader>
              <header className="item-center flex justify-between border-b-[0.2px] border-black py-2">
                <SheetClose asChild>
                  <button>
                    <X strokeWidth={1.5} className="h-10 w-10" />
                    <span className="sr-only">Close</span>
                  </button>
                </SheetClose>
                <SheetTitle
                  className={`${outfit.className} mt-[6px] text-[22px] font-semibold leading-[28px] tracking-spaced-06 text-[#0A0D13] sm:mt-1 sm:text-2xl`}
                >
                  Cart Summary
                </SheetTitle>
              </header>
            </SheetHeader>

            {message && <p className="text-red-500">{message}</p>}
            {totalItemsInBag > 0 ? (
              <div>
                <Card className="mt-6 flex flex-col gap-2 border-none">
                  {items.map((item, index) => {
                    const wishlistItem = {
                      id: item.productId, // Map productId to id
                      name: item.name,
                      price: item.price,
                      currencyCode: item.currencyCode,
                      imageUrl: item.imageUrl,
                    };
                    return (
                      <React.Fragment key={item.id || index}>
                        <section className="flex items-center justify-between">
                          <h1
                            className={`${outfit.className} w-7/12 text-xs font-semibold leading-[19px] tracking-[0.3px] sm:text-base`}
                          >
                            {item.name}
                          </h1>
                          <span
                            className={`${outfit.className} W-5/12 pr-2 text-xs font-semibold leading-[19px] tracking-[0.3px] sm:text-base`}
                          >
                            {item.currencyCode} {item.price}
                          </span>
                        </section>
                        <section className="flex gap-4">
                          <div className="relative h-[110px] w-[65%] sm:h-[150px] sm:w-1/2">
                            <Image
                              src={item.imageUrl || placeholderImage}
                              alt="Product image"
                              fill={true}
                              style={{ objectFit: "cover" }}
                            />
                          </div>

                          <div className="mt-6 grid w-full grid-cols-2 grid-rows-2 items-start px-2">
                            <span
                              className={`${outfit.className} text-xs font-semibold leading-[19px] tracking-[0.3px] sm:mt-2 sm:text-base`}
                            >
                              Size
                            </span>
                            <div className="shadow-xs flex items-center justify-center rounded-[1.62px] border-[0.2px] sm:py-2">
                              <span
                                className={`${outfit.className} text-xs font-medium leading-[19px] tracking-[0.3px] sm:text-base`}
                              >
                                {item.size}
                              </span>
                            </div>

                            <span
                              className={`${outfit.className} text-xs font-semibold leading-[19px] tracking-[0.3px] sm:mt-2 sm:text-base`}
                            >
                              Qty
                            </span>
                            <div className="shadow-xs flex items-center justify-between rounded-[1.62px] border-[0.2px] sm:py-2">
                              <button
                                onClick={() =>
                                  onUpdateQuantityClick(item.id, "DECREMENT")
                                }
                                disabled={item.quantity <= 1}
                                className="rounded px-2"
                              >
                                <span
                                  className={`${outfit.className} text-xs font-medium leading-[19px] tracking-[0.3px] sm:pl-2 sm:text-base`}
                                >
                                  -
                                </span>
                              </button>
                              <span
                                className={`${outfit.className} text-xs font-medium leading-[19px] tracking-[0.3px] sm:text-base`}
                              >
                                {item.quantity}
                              </span>
                              <button
                                onClick={() =>
                                  onUpdateQuantityClick(item.id, "INCREMENT")
                                }
                                className="rounded px-2 pt-[2px] sm:pt-[4px]"
                              >
                                <span
                                  className={`${outfit.className} text-xs font-medium leading-[19px] tracking-[0.3px] sm:pr-2 sm:text-base`}
                                >
                                  +
                                </span>
                              </button>
                            </div>
                          </div>
                        </section>

                        <section className="flex justify-between">
                          <AddToWishlistSidebar
                            session={session?.data?.session}
                            item={wishlistItem}
                          />
                          <button
                            onClick={() => onRemoveItemClick(item.id)}
                            className={`${outfit.className} pr-2 text-xs font-semibold leading-[19px] tracking-[0.3px] text-red-500/90 underline sm:text-base`}
                          >
                            Remove
                          </button>
                        </section>
                        <section></section>
                        {index < items.length - 1 && <hr className="mt-2"></hr>}
                      </React.Fragment>
                    );
                  })}
                </Card>
              </div>
            ) : (
              <div className="flex flex-1 items-center justify-center">
                <span className="mt-32">Your cart is empty</span>
              </div>
            )}
          </div>
          {totalItemsInBag > 0 && (
            <footer
              style={{ borderTop: "0.5px solid black" }}
              className="flex flex-grow-0 flex-col items-center justify-center"
            >
              <div className="mt-4 flex w-full justify-between">
                <span
                  className={`${outfit.className} text-xs font-light leading-[6px] tracking-spaced-06 text-[#838383] sm:text-sm`}
                >
                  Shipping
                </span>
                <span
                  className={`${outfit.className} text-xs font-light leading-[6px] tracking-spaced-06 text-[#838383] sm:text-sm`}
                >
                  Calculated at checkout
                </span>
              </div>
              <div className="mt-8 flex w-full justify-between">
                <span
                  className={`${outfit.className} text-xl font-semibold leading-[6px] tracking-spaced-06 sm:text-2xl`}
                >
                  TOTAL
                </span>
                <span
                  className={`${outfit.className} font-semibold leading-[6px] tracking-spaced-06 sm:text-lg`}
                >
                  {items[0].currencyCode} {data.cart.cartInfo.totalPrice}
                  <br></br>
                  <span
                    className={`${outfit.className} text-xs font-light leading-[6px] tracking-spaced-06 text-[#838383] sm:text-sm`}
                  >
                    (Including taxes)
                  </span>
                </span>
              </div>
              <SheetClose className="mt-6 w-full" asChild>
                <button
                  onClick={onCheckoutClick}
                  disabled={isCheckoutDisabled}
                  className={`flex h-10 w-full items-center justify-center rounded-none ${isLoading ? "bg-[#195514]/50" : "bg-[#195514]"} py-2 text-white sm:h-auto sm:py-4`}
                  type="submit"
                >
                  <span
                    className={`${fira_mono.className} text-sm font-bold leading-[22px] tracking-spaced-06`}
                  >
                    {isCheckoutDisabled ? (
                      <>
                        <LoaderCircle
                          className="animate-spin"
                          size={28}
                          strokeWidth={2}
                        />
                      </>
                    ) : (
                      <>CHECKOUT</>
                    )}
                  </span>
                </button>
              </SheetClose>
            </footer>
          )}
        </SheetContent>
      </Sheet>
    </>
  );
};

export default CartSidebar;
