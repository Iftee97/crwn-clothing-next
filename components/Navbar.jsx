import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { AuthContext } from "@/context/AuthContext";
import { CartContext } from "@/context/CartContext";
import { HiOutlineMenu, HiOutlineShoppingBag } from "react-icons/hi";
import SlidingCart from "./SlidingCart";
import UserDropdown from "./UserDropdown";

export default function Navbar() {
  const router = useRouter();

  const { toggleSidebar, showUserDropdown, setShowUserDropdown } =
    useContext(AppContext);
  const { user } = useContext(AuthContext);
  const { getCartItemsCount, isCartOpen, setIsCartOpen } =
    useContext(CartContext);

  return (
    <nav className="bg-white shadow-md h-[70px] w-full flex justify-between items-center p-[18px] md:p-[24px]">
      <Link href="/">
        <Image
          src="/crwn.svg"
          alt="logo"
          width={40}
          height={40}
          priority={true}
          style={{
            height: "auto",
            width: "auto",
          }}
        />
      </Link>
      <div className="h-full hidden md:flex items-center gap-6 font-normal">
        <Link
          href="/"
          className={`cursor-pointer py-1 px-2 rounded  
            ${router.pathname === "/" && "bg-gray-800 text-white"}
          `}
        >
          HOME
        </Link>
        <Link
          href="/shop"
          className={`cursor-pointer py-1 px-2 rounded  
            ${router.pathname === "/shop" && "bg-gray-800 text-white"}
          `}
        >
          SHOP
        </Link>
        {user && user._id ? (
          <div className="relative">
            <span
              className="bg-blue-200 py-1 px-2 rounded cursor-pointer inline-block"
              onClick={() => setShowUserDropdown(!showUserDropdown)}
            >
              {user.username} {user.isAdmin && <span>(admin)</span>}
            </span>
            {showUserDropdown && <UserDropdown />}
          </div>
        ) : (
          <Link
            href="/sign-in"
            className={`cursor-pointer py-1 px-2 rounded 
              ${router.pathname === "/sign-in" && "bg-gray-800 text-white"}
            `}
          >
            SIGN IN
          </Link>
        )}
      </div>
      <div className="flex items-center gap-3">
        <>
          <button
            className="cursor-pointer flex items-center gap-1 lg:gap-2 hover:bg-gray-800 hover:text-white py-1 px-2 rounded"
            onClick={() => setIsCartOpen(!isCartOpen)}
          >
            <HiOutlineShoppingBag className="text-2xl" />
            <span>({getCartItemsCount()})</span>
          </button>
          <SlidingCart />
        </>
        <button
          className="inline-block md:hidden cursor-pointer"
          onClick={toggleSidebar}
        >
          <HiOutlineMenu className="text-2xl font-normal" />
        </button>
      </div>
    </nav>
  );
}
