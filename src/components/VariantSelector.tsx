"use client";
import { useState, useCallback } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { raleway } from "@/app/fonts";
import { ProductVariant, CartItem, Customer, OldCartData } from "@/utils/types";
import { Fira_Mono } from "next/font/google";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { headers } from "@/utils/const";
import { throttle } from "lodash";
import { useSheet } from "@/context/SheetContext";

const fira_mono = Fira_Mono({ weight: "500", subsets: ["latin"] });

const VariantSelector = ({
  variants,
  session,
  productName,
}: {
  variants: ProductVariant[];
  session: Customer;
  productName: string;
}) => {
  const { sheetTriggerRef } = useSheet();

  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Loading state for add to cart
  const router = useRouter();
  const searchParams = useSearchParams();
  const queryClient = useQueryClient();

  // Defining the mutation
  const mutation = useMutation({
    mutationFn: async (cartItem: CartItem) => {
      const response = await fetch("/api/cart", {
        method: "POST",
        headers: headers,
        body: JSON.stringify({
          customerId: session.id,
          item: cartItem,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to add item to cart");
      }

      return response.json();
    },

    onMutate: async (cartItem: CartItem) => {
      console.log("Optimistic Update Starting");
      //CANCEL OUTGOING REFETCHES
      // so they don't overwrite our optimistic update
      await queryClient.cancelQueries({ queryKey: ["cart"] });

      // snapshot the previous state
      const previousCart = queryClient.getQueryData<OldCartData>(["cart"]);

      console.log("previous cart is: ", previousCart);
      let updatedItems;
      // do the optmistic update
      if (previousCart?.cart) {
        // check if the item already exists in the cart
        const existingItem =
          previousCart.cart.cartInfo.items.length > 0
            ? previousCart.cart.cartInfo.items.find(
                (item: CartItem) => item.id === cartItem.id,
              )
            : null;

        if (existingItem) {
          updatedItems = previousCart.cart.cartInfo.items.map(
            (item: CartItem) =>
              item.id === existingItem.id
                ? { ...item, quantity: item.quantity + 1 }
                : item,
          );
        } else {
          updatedItems = [...previousCart.cart.cartInfo.items, cartItem];
        }

        // RETURN THE NEW OPTIMISTIC CART DATA

        const updatedCardData: OldCartData = {
          ...previousCart,
          cart: {
            ...previousCart.cart,
            cartInfo: {
              ...previousCart.cart.cartInfo,
              items: updatedItems,
              totalPrice: previousCart.cart.cartInfo.totalPrice
                ? previousCart.cart.cartInfo.totalPrice + cartItem.price
                : cartItem.price,
            },
          },
        };

        console.log("Optimistic Update Data:", updatedCardData);
        queryClient.setQueryData(["cart"], updatedCardData);

        if (sheetTriggerRef.current) {
          sheetTriggerRef.current.click();
        }

        return { previousCart };
      }
      return { previousCart };
    },
    onError: (error, cartItem, context) => {
      console.error("Mutation Error:", error);
      queryClient.setQueryData(["cart"], context?.previousCart);
      setMessage("An error occurred while adding the item to the cart.");
    },

    onSettled: () => {
      console.log("Mutation Settled");
      queryClient.refetchQueries({ queryKey: ["cart"] });
    },
  });

  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(
    variants.find((variant) => variant.title === searchParams.get("variant")) ||
      null,
  );

  const handleVariantClick = (variant: ProductVariant) => {
    setMessage("");

    setSelectedVariant(variant);
  };

  const handleAddToCart = async (selectedVariant: ProductVariant) => {
    if (!session) {
      router.push("/auth/sign-in");
      return;
    }
    setIsLoading(false);

    const cartItem: CartItem = {
      id: selectedVariant.id,
      name: productName,
      price: parseFloat(selectedVariant.priceV2.amount),
      currencyCode: selectedVariant.priceV2.currencyCode,
      imageUrl: selectedVariant.image?.url!,
      size: selectedVariant.selectedOptions[0].value,
      quantity: 1,
    };

    mutation.mutate(cartItem);
  };

  // Create a throttled version of handleAddToCart
  const throttledHandleAddToCart = useCallback(
    throttle(handleAddToCart, 1000), // 1000ms (1 second) throttle delay
    [session, router, productName, mutation], // Dependencies
  );

  // Usage in your component
  const onAddToCartClick = (selectedVariant: ProductVariant) => {
    setIsLoading(true);
    throttledHandleAddToCart(selectedVariant);
  };
  return (
    <div className="mt-8">
      {message && <p className="text-red-500">{message}</p>}
      <h1
        className={`${raleway.className} text-start font-medium leading-[14.4px] tracking-spaced-06`}
      >
        {variants[0].selectedOptions[0].name}
      </h1>
      <div className="mt-2 border-[0.2px] px-4 py-4">
        <ul className="flex justify-between lg:px-6">
          {variants.map((variant, index) => (
            <li
              onClick={() => handleVariantClick(variant)}
              key={index}
              className={`${
                variant.currentlyNotInStock
                  ? "text-gray-400 line-through"
                  : "flex h-12 w-12 cursor-pointer items-center justify-center hover:border hover:border-black"
              } ${
                selectedVariant?.title === variant.title
                  ? "bg-black text-white"
                  : ""
              }`}
            >
              {variant.title}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-8 flex gap-5">
        <button
          onClick={() => {
            selectedVariant
              ? onAddToCartClick(selectedVariant)
              : setMessage(
                  "Please choose your preferred options before proceeding.",
                );
          }}
          className="w-full border border-black py-4"
          disabled={isLoading} // Disable button during loading
        >
          <span
            className={`${fira_mono.className} leading[14.4px] text-sm tracking-spaced-06`}
          >
            {isLoading ? "ADDING..." : "ADD TO BAG"}
          </span>
        </button>
        <button className="w-full border bg-black py-4">
          <span
            className={`${fira_mono.className} leading[14.4px] text-sm tracking-spaced-06 text-white`}
          >
            ADD TO WISHLIST
          </span>
        </button>
      </div>
    </div>
  );
};

export default VariantSelector;
