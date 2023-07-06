import { createContext, useState } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'

export const CartContext = createContext()

export function CartContextProvider({ children }) {
  const [isCartOpen, setIsCartOpen] = useState(false)
  // const [cartItems, setCartItems] = useState([]) // without persisting to localStorage
  const [cartItems, setCartItems] = useLocalStorage('cartItems', []) // with persisting to localStorage under the key 'cartItems' with an initial value of []

  function addItemToCart(productToAdd) {
    const existingCartItem = cartItems.find((cartItem) => cartItem.id === productToAdd.id)
    if (existingCartItem) {
      increaseQuantity(productToAdd)
    } else {
      setCartItems([...cartItems, { ...productToAdd, quantity: 1 }])
    }
  }

  function increaseQuantity(productToIncrease) {
    setCartItems(
      cartItems.map((cartItem) => cartItem.id === productToIncrease.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
      )
    )
  }

  function decreaseQuantity(productToDecrease) {
    if (productToDecrease.quantity === 1) {
      removeItemFromCart(productToDecrease)
    } else {
      setCartItems(
        cartItems.map((cartItem) => cartItem.id === productToDecrease.id
          ? { ...cartItem, quantity: cartItem.quantity - 1 }
          : cartItem
        )
      )
    }
  }

  function removeItemFromCart(productToRemove) {
    setCartItems(cartItems.filter((cartItem) => cartItem.id !== productToRemove.id))
  }

  function getCartTotal() {
    return cartItems.reduce((accumulatedTotal, cartItem) => (
      accumulatedTotal + cartItem.quantity * cartItem.price
    ), 0)
  }

  function getCartItemsCount() {
    return cartItems.reduce((accumulatedQuantity, cartItem) => (
      accumulatedQuantity + cartItem.quantity
    ), 0)
  }

  function clearCart() {
    setCartItems([])
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
  )
}
