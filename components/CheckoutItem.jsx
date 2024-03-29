import Image from "next/image";
import { useContext } from "react";
import { CartContext } from "@/context/CartContext";
import { HiOutlinePlusSm, HiOutlineMinusSm } from "react-icons/hi";

export default function CheckoutItem({ cartItem }) {
  const { title, imageUrl, price, quantity } = cartItem;

  const { increaseQuantity, decreaseQuantity, removeItemFromCart } =
    useContext(CartContext);

  return (
    <div className="w-full flex flex-col lg:flex-row items-center gap-4 text-[24px] lg:text-[20px] py-[15px] min-h-[100px] border-b border-gray-400 text-center lg:text-left font-light">
      <div className="relative aspect-square w-full md:w-[30%] lg:w-[30%]">
        <Image
          src={imageUrl}
          alt={title}
          sizes="100px"
          fill={true}
          className="w-full h-auto object-cover"
        />
      </div>
      <span className="font-medium w-full md:w-[30%] lg:w-[30%]">{title}</span>
      <span className="w-full md:w-[30%] lg:w-[30%] flex items-center justify-center lg:justify-start gap-4 lg:gap-2">
        <div
          className="cursor-pointer"
          onClick={() => decreaseQuantity(cartItem)}
        >
          <HiOutlineMinusSm />
        </div>
        <span className="value my-2 mb-[10px] bg-gray-100 py-2 px-4">
          {quantity}
        </span>
        <div
          className="cursor-pointer"
          onClick={() => increaseQuantity(cartItem)}
        >
          <HiOutlinePlusSm />
        </div>
      </span>
      <span className="price w-full md:w-[10%] lg:w-[10%]">
        ${price.toLocaleString()}
      </span>
      <>
        {/* larger screens */}
        <div
          className="hidden lg:block remove-button w-[10%] text-center cursor-pointer"
          onClick={() => removeItemFromCart(cartItem)}
        >
          &#10005;
        </div>
        {/* mobile screens */}
        <div
          className="block lg:hidden remove-button cursor-pointer text-red-500 text-lg mt-2"
          onClick={() => removeItemFromCart(cartItem)}
        >
          &#10005; remove item
        </div>
      </>
    </div>
  );
}
