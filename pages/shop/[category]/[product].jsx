import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { useState, useContext } from "react";
import { useRouter } from "next/router";
import { CartContext } from "@/context/CartContext";
import { HiOutlinePlus, HiOutlineMinus } from "react-icons/hi";

export default function SingleProduct({ product }) {
  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[75vh]">
        <p className="text-2xl">Product not found</p>
        <Link
          href="/shop"
          className="border border-neutral-900 py-2 px-3 rounded bg-white text-black hover:bg-gray-100 mt-4 cursor-pointer"
        >
          Go To Shop
        </Link>
      </div>
    );
  }

  const router = useRouter();
  const { product: productTitle } = router.query;
  const { addItemToCart, increaseQuantity, decreaseQuantity, setIsCartOpen } =
    useContext(CartContext);
  const [qty, setQty] = useState(1);

  function increaseQty() {
    setQty(qty + 1);
    increaseQuantity(product);
  }

  function decreaseQty() {
    if (qty === 1) return;
    setQty(qty - 1);
    decreaseQuantity(product);
  }

  function addToCartHandler() {
    addItemToCart(product, qty);
    setIsCartOpen(true);
  }

  return (
    <>
      <Head>
        <title>
          {productTitle
            ? `${productTitle} | Crwn Clothing`
            : "Product | Crwn Clothing"}
        </title>
      </Head>
      <div className="max-w-[768px] mx-auto">
        <div className="flex flex-col lg:flex-row items-start justify-center gap-10 mb-6">
          <>
            {/* hidden on small, show on large screens and above */}
            <div className="hidden lg:flex lg:relative lg:w-[500px] lg:h-[500px] lg:flex-1">
              <Image
                src={product.imageUrl}
                alt={product.title}
                // width={400}
                // height={400}
                sizes="500px" // adds a fixed size, better approach than sepcifying fixed height and width
                fill={true} // sizes and fill must be used together
                className="object-cover w-full h-full mx-auto"
              />
            </div>
            {/* hidden on large, show on small screens */}
            {/* <img
              src={product.imageUrl}
              alt={product.title}
              className="w-[400px] h-[400px] object-cover lg:hidden"
            /> */}
            {/* <Image
              src={product.imageUrl}
              alt={product.title}
              width={400}
              height={400}
              className="object-cover mx-auto lg:hidden"
            /> */}
            <div className="relative flex w-full h-[350px] mx-auto lg:hidden">
              <Image
                src={product.imageUrl}
                alt={product.title}
                sizes="350px"
                fill={true}
                className="object-cover w-full h-full mx-auto"
              />
            </div>
          </>
          <div className="flex flex-col lg:flex-1 gap-2 lg:gap-4">
            <h2 className="text-[36px] text-center font-semibold">
              {product.title}
            </h2>
            <p className="leading-7 mb-2">{product.description}</p>
            <div className="flex items-center justify-between">
              <p className="text-[22px] lg:text-[24px]">
                Price: ${product.price}
              </p>
              <div className="flex items-center gap-2">
                <button className="cursor-pointer" onClick={decreaseQty}>
                  <HiOutlineMinus className="text-2xl" />
                </button>
                <span className="text-2xl bg-gray-100 py-2 px-4">{qty}</span>
                <button className="cursor-pointer" onClick={increaseQty}>
                  <HiOutlinePlus className="text-2xl" />
                </button>
              </div>
            </div>
            <button
              className="bg-black hover:bg-gray-800 text-white mt-4 py-2 px-4 rounded"
              onClick={addToCartHandler}
            >
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: "blocking",
  };
}

export async function getStaticProps(context) {
  // console.log("context: >>>>>", context);
  const {
    params: { product: productTitle },
  } = context;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/products/get-product-by-title?title=${productTitle}`
  );
  const { product } = await res.json();

  return {
    props: {
      product,
    },
  };
}
