import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { useState, useContext } from "react";
import { useRouter } from "next/router";
import { CartContext } from "@/context/CartContext";
import { HiOutlinePlus, HiOutlineMinus } from "react-icons/hi";
import getBase64 from "@/utils/getLocalBase64";

export default function SingleProduct({ product, blurDataUrl }) {
  const router = useRouter();
  const { addItemToCart, increaseQuantity, decreaseQuantity, setIsCartOpen } =
    useContext(CartContext);
  const [qty, setQty] = useState(1);

  const productNotFound = !product;

  function increaseQty() {
    setQty((prevQty) => prevQty + 1);
    increaseQuantity(product);
  }

  function decreaseQty() {
    if (qty === 1) return;
    setQty((prevQty) => prevQty - 1);
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
          {product
            ? `${product.title} | Crwn Clothing`
            : "Product | Crwn Clothing"}
        </title>
      </Head>
      <div className="max-w-[1024px] mx-auto">
        {productNotFound ? (
          <div className="flex flex-col items-center justify-center min-h-[75vh]">
            <p className="text-2xl">Product not found</p>
            <Link
              href="/shop"
              className="border border-neutral-900 py-2 px-3 rounded bg-white text-black hover:bg-gray-100 mt-4 cursor-pointer"
            >
              Go To Shop
            </Link>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row items-start justify-between gap-10 mb-6">
            {/* <div className="hidden lg:flex lg:relative lg:w-[500px] lg:h-[500px] lg:flex-1">
              <Image
                src={product.imageUrl}
                alt={product.title}
                sizes="500px"
                fill={true}
                className="object-cover w-full h-full mx-auto"
              />
            </div>
            <div className="relative flex w-full h-[350px] mx-auto lg:hidden">
              <Image
                src={product.imageUrl}
                alt={product.title}
                sizes="350px"
                fill={true}
                className="object-cover w-full h-full mx-auto"
              />
            </div> */}
            <div className="relative aspect-square h-full max-h-[550px] w-full flex-1 overflow-hidden">
              <Image
                src={product.imageUrl}
                alt={product.title}
                sizes="(min-width: 1024px) 50vw, 100vw"
                fill={true}
                placeholder="blur"
                blurDataURL={blurDataUrl}
                className="h-full w-full object-cover mx-auto"
              />
            </div>
            <div className="flex flex-col lg:flex-1 gap-2 lg:gap-4 w-full flex-1">
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
        )}
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
  const {
    params: { product: productTitle },
  } = context;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/products/get-product-by-title?title=${productTitle}`
  );
  const { product } = await res.json();

  const blurDataUrl = await getBase64(product.imageUrl);

  return {
    props: {
      product,
      blurDataUrl,
    },
  };
}
