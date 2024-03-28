import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import { CartContext } from "@/context/CartContext";
import { AuthContext } from "@/context/AuthContext";
import CheckoutItem from "@/components/CheckoutItem";
import PaymentForm from "@/components/PaymentForm";
import { toast } from "react-toastify";
import Cookies from "js-cookie";

export default function Checkout() {
  const { cartItems, getCartTotal, clearCart } = useContext(CartContext);
  const { user } = useContext(AuthContext);

  const router = useRouter();
  const { query } = router;
  console.log("query: >>>>>>>", query);

  useEffect(() => {
    if (query.success) {
      toast.success("Payment successful");
      createOrder();
    } else if (query.canceled) {
      toast.error("Payment canceled");
    }
  }, [query, query]);

  async function createOrder() {
    try {
      const response = await fetch("/api/orders/create-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
        body: JSON.stringify({
          user: user._id,
          items: cartItems,
          total: getCartTotal(),
        }),
      });
      if (!response.ok) {
        throw new Error("Something went wrong");
      }
      const data = await response.json();
      console.log("data: >>>>>>>", data);
      toast.success("Order created successfully");
      clearCart();
      console.log("response: >>>>>>>", response);
    } catch (error) {
      console.log("error: >>>>>>>", error);
      toast.error("Error creating order");
    }
  }

  return (
    <>
      <Head>
        <title>Checkout | Crwn Clothing</title>
      </Head>

      <div className="max-w-[1024px] min-h-[90vh] mt-[16px] lg:mt-[40px] mx-auto mb-0 flex flex-col items-center">
        <h1 className="text-[32px] font-semibold">Checkout</h1>
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
