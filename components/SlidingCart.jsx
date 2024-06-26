import Link from "next/link";
import Image from "next/image";
import { Fragment, useContext } from "react";
import { CartContext } from "@/context/CartContext";
import { Dialog, Transition } from "@headlessui/react";
import { HiOutlineX } from "react-icons/hi";

export default function SlidingCart() {
  const {
    isCartOpen,
    setIsCartOpen,
    cartItems,
    increaseQuantity,
    decreaseQuantity,
    removeItemFromCart,
    getCartTotal,
    clearCart,
  } = useContext(CartContext);

  return (
    <Transition.Root show={isCartOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-50 overflow-hidden"
        onClose={() => setIsCartOpen(!isCartOpen)}
      >
        <div className="absolute inset-0 overflow-hidden">
          <Transition.Child
            as={Fragment}
            enter="ease-in-out duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in-out duration-500"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="absolute inset-0 transition-opacity bg-gray-500 bg-opacity-75" />
          </Transition.Child>
          <div className="fixed inset-y-0 right-0 flex max-w-full pl-10">
            <Transition.Child
              as={Fragment}
              enter="transform transition ease-in-out duration-500 sm:duration-700"
              enterFrom="translate-x-full"
              enterTo="translate-x-0"
              leave="transform transition ease-in-out duration-500 sm:duration-700"
              leaveFrom="translate-x-0"
              leaveTo="translate-x-full"
            >
              <div className="w-screen max-w-md">
                <div className="flex flex-col h-full overflow-y-scroll bg-white shadow-xl">
                  <div className="flex-1 px-4 py-6 overflow-y-auto sm:px-6">
                    <div className="flex items-start justify-between">
                      <Dialog.Title className="text-lg font-medium text-gray-900">
                        Shopping cart
                      </Dialog.Title>
                      <div className="flex items-center ml-3 h-7">
                        <button
                          type="button"
                          className="p-2 -m-2 text-gray-400 hover:text-gray-500"
                          onClick={() => setIsCartOpen(false)}
                        >
                          <span className="sr-only">Close panel</span>
                          <HiOutlineX className="w-6 h-6" aria-hidden="true" />
                        </button>
                      </div>
                    </div>
                    <div className="mt-8">
                      <div className="flow-root">
                        {cartItems.length > 0 ? (
                          <ul
                            role="list"
                            className="-my-6 divide-y divide-gray-200"
                          >
                            {cartItems.map((product) => (
                              <li
                                key={product._id + Math.random()}
                                className="relative flex py-6"
                              >
                                <div className="top-0 left-0 right-0 z-50 w-full h-full absolute hidden" />
                                <div className="relative flex-shrink-0 w-24 h-24 overflow-hidden border border-gray-200 rounded-md">
                                  <Image
                                    src={product.imageUrl}
                                    alt={product.title}
                                    width={100}
                                    height={100}
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                                <div className="flex flex-col flex-1 ml-4">
                                  <div>
                                    <div className="flex justify-between text-base font-medium text-gray-900">
                                      <h3>
                                        <Link
                                          href={`/shop/${product.category}/${product.title}`}
                                        >
                                          <span
                                            onClick={() => setIsCartOpen(false)}
                                          >
                                            {product.title}
                                          </span>
                                        </Link>
                                      </h3>
                                      <p className="ml-4">
                                        ${product.price.toLocaleString()}
                                      </p>
                                    </div>
                                    <p className="mt-1 text-sm text-gray-500">
                                      single variant
                                    </p>
                                  </div>
                                  <div className="flex items-end justify-between flex-1 text-sm">
                                    <div className="border">
                                      <button
                                        className="px-2"
                                        onClick={() =>
                                          decreaseQuantity(product)
                                        }
                                      >
                                        -
                                      </button>
                                      <span className="px-2 border-l border-r">
                                        {product.quantity}
                                      </span>
                                      <button
                                        className="px-2"
                                        onClick={() =>
                                          increaseQuantity(product)
                                        }
                                      >
                                        +
                                      </button>
                                    </div>
                                    <div className="flex">
                                      <button
                                        onClick={() =>
                                          removeItemFromCart(product)
                                        }
                                        type="button"
                                        className="font-medium text-red-500 hover:text-red-600"
                                      >
                                        Remove
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <div>
                            <p>Nothing in your cart!</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  {cartItems.length > 0 && (
                    <div className="px-4 py-6 border-t border-gray-200 sm:px-6">
                      <div className="flex justify-between text-base font-medium text-gray-900">
                        <p>Subtotal</p>
                        <p>${getCartTotal().toLocaleString()}</p>
                      </div>
                      <p className="mt-0.5 text-sm text-gray-500">
                        Shipping and taxes calculated at checkout.
                      </p>
                      <div
                        className="mt-6"
                        onClick={() => setIsCartOpen(false)}
                      >
                        <Link
                          href="/checkout"
                          className="flex items-center justify-center px-6 py-3 text-base font-medium text-white bg-black hover:bg-gray-800 border border-transparent rounded-md shadow-sm cursor-pointer"
                        >
                          Go To Checkout
                        </Link>
                      </div>
                      <div className="flex justify-center mt-6 text-sm text-center text-gray-500">
                        <p>
                          <button
                            className="font-medium hover:text-gray-800"
                            onClick={() => clearCart()}
                          >
                            Clear Cart
                          </button>{" "}
                          or{" "}
                          <button
                            type="button"
                            className="font-medium hover:text-gray-800"
                            onClick={() => setIsCartOpen(false)}
                          >
                            Continue Shopping{" "}
                            <span aria-hidden="true">&rarr;</span>
                          </button>
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
