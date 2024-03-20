import Head from "next/head";
import { useState, useContext } from "react";
import { useRouter } from "next/router";
import { CartContext } from "@/context/CartContext";
import { HiOutlinePlus, HiOutlineMinus } from "react-icons/hi";

export default function SingleProduct({ product }) {
  console.log("product: >>>>>>>", product);

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
          <img
            src={product.imageUrl}
            alt={product.title}
            className="w-[400px] h-[400px] object-cover"
          />
          <div className="flex flex-col gap-2 lg:gap-4">
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
