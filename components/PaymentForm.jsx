import { useRouter } from "next/router";
import { useState, useContext } from "react";
import { CartContext } from "@/context/CartContext";
import { AuthContext } from "@/context/AuthContext";
import { toast } from "react-toastify";
import Cookies from "js-cookie";

export default function PaymentForm() {
  const router = useRouter();
  const { user } = useContext(AuthContext);
  const { cartItems, getCartTotal } = useContext(CartContext);
  const [isLoading, setIsLoading] = useState(false);

  const amount = getCartTotal();

  async function stripeRedirectCheckout(e) {
    e.preventDefault();

    if (!user._id) {
      router.push("/sign-in");
      toast.info("You must be logged in to make a payment.");
      return;
    }

    try {
      setIsLoading(true);
      const response = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
        body: JSON.stringify({
          items: cartItems,
          total: amount,
        }),
      });
      if (!response.ok) {
        throw new Error("Something went wrong");
      } else {
        const { redirectUrl } = await response.json();
        router.push(redirectUrl);
      }
    } catch (error) {
      console.log("error: >>>>>>", error);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex justify-center lg:justify-end mt-8 w-full">
      <form onSubmit={stripeRedirectCheckout}>
        <button
          type="submit"
          disabled={isLoading}
          className={`bg-black hover:bg-gray-800 text-white py-2 px-4 rounded ${
            isLoading &&
            "opacity-50 cursor-not-allowed bg-gray-500 hover:bg-gray-500 "
          }`}
        >
          {isLoading ? "loading..." : "pay now"}
        </button>
      </form>
    </div>
  );
}
