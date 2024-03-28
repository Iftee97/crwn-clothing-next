import Head from "next/head";
import Link from "next/link";
import { useContext } from "react";
import { CartContext } from "@/context/CartContext";
import { AuthContext } from "@/context/AuthContext";
import CheckoutItem from "@/components/CheckoutItem";
import PaymentForm from "@/components/PaymentForm";

export default function Checkout() {
  const { cartItems, getCartTotal } = useContext(CartContext);
  const { user } = useContext(AuthContext);

  return (
    <>
      <Head>
        <title>Checkout | Crwn Clothing</title>
      </Head>

      <div className="max-w-[1024px] min-h-[90vh] mt-[16px] lg:mt-[40px] mx-auto mb-0 flex flex-col items-center">
        {cartItems?.length > 0 ? (
          <>
            <div className="w-full py-[10px] hidden lg:flex border-b border-gray-400">
              <div className="header-block w-[30%]">
                <span>Image</span>
              </div>
              <div className="header-block w-[30%]">
                <span>Title</span>
              </div>
              <div className="header-block w-[30%]">
                <span>Quantity</span>
              </div>
              <div className="header-block w-[10%]">
                <span>Price</span>
              </div>
              <div className="header-block w-[10%]">
                <span>Remove</span>
              </div>
            </div>
            {cartItems.map((cartItem) => (
              <CheckoutItem key={cartItem._id} cartItem={cartItem} />
            ))}
            <div className="w-full flex items-center justify-center lg:justify-end mt-6">
              <span className="total text-[32px]">
                Total: ${getCartTotal().toLocaleString()}
              </span>
            </div>
            {user?._id ? (
              <PaymentForm />
            ) : (
              <div className="mt-6 w-full text-sm text-gray-700 text-end font-medium">
                Please{" "}
                <Link
                  href="/sign-in"
                  className="text-blue-500 hover:text-blue-600"
                >
                  sign in
                </Link>{" "}
                to continue with payment.
              </div>
            )}
          </>
        ) : (
          <div className="mt-[1rem] text-[1.75rem] font-medium">
            Your cart is empty.
          </div>
        )}
      </div>
    </>
  );
}
