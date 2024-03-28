import { createContext, useState, useEffect } from "react";
import { useLocalStorage } from "@/hooks/useLocalStorage";

export const CartContext = createContext();

export function CartContextProvider({ children }) {
  const [isMounted, setIsMounted] = useState(false); // mounted state kept track of to remove weird hydration mismatch error
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useLocalStorage("cartItems", []); // with persisting to localStorage under the key 'cartItems' with an initial value of []

  useEffect(() => {
    setIsMounted(true);

    return () => {
      setIsMounted(false);
    };
  }, []);

  function addItemToCart(productToAdd, qty) {
    const existingCartItem = cartItems.find(
      (cartItem) => cartItem._id === productToAdd._id
    );
    if (existingCartItem) {
      increaseQuantity(productToAdd);
    } else {
      setCartItems([...cartItems, { ...productToAdd, quantity: qty }]);
    }
  }

  function increaseQuantity(productToIncrease) {
    setCartItems(
      cartItems.map((cartItem) =>
        cartItem._id === productToIncrease._id
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      )
    );
  }

  function decreaseQuantity(productToDecrease) {
    if (productToDecrease.quantity === 1) {
      removeItemFromCart(productToDecrease);
    } else {
      setCartItems(
        cartItems.map((cartItem) =>
          cartItem._id === productToDecrease._id
            ? { ...cartItem, quantity: cartItem.quantity - 1 }
            : cartItem
        )
      );
    }
  }

  function removeItemFromCart(productToRemove) {
    setCartItems(
      cartItems.filter((cartItem) => cartItem._id !== productToRemove._id)
    );
  }

  function getCartTotal() {
    return cartItems.reduce(
      (accumulatedTotal, cartItem) =>
        accumulatedTotal + cartItem.quantity * cartItem.price,
      0
    );
  }

  function getCartItemsCount() {
    return cartItems.reduce(
      (accumulatedQuantity, cartItem) =>
        accumulatedQuantity + cartItem.quantity,
      0
    );
  }

  function clearCart() {
    setCartItems([]);
  }

  if (!isMounted) {
    return null;
  }

  return (
    <CartContext.Provider
      value={{
        isCartOpen,
        setIsCartOpen,
        cartItems,
        setCartItems,
        addItemToCart,
        increaseQuantity,
        decreaseQuantity,
        removeItemFromCart,
        getCartTotal,
        getCartItemsCount,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
