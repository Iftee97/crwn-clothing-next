import Head from 'next/head'
import { useState, useEffect, useContext } from 'react'
import { useRouter } from 'next/router'
import { AppContext } from '@/context/AppContext'
import { CartContext } from '@/context/CartContext'
import { HiOutlinePlus, HiOutlineMinus } from 'react-icons/hi'

export default function SingleProduct() {
  const router = useRouter()
  const { category: categoryTitle, product: productTitle } = router.query
  const { categories } = useContext(AppContext)
  const { addItemToCart, increaseQuantity, decreaseQuantity } = useContext(CartContext)
  const [product, setProduct] = useState(null)
  const [qty, setQty] = useState(1)

  useEffect(() => {
    if (productTitle) {
      document.title = `${productTitle} | Crwn Clothing`
    }
  }, [productTitle])

  useEffect(() => {
    if (categories && categories?.length > 0) {
      const c = categories?.find(cat => cat.title === categoryTitle)
      if (!c) return
      const p = c.items.find(item => item.name === productTitle)
      if (!p) return
      p.category = c.title
      setProduct(p)
    }
  }, [categories, categoryTitle, productTitle])

  function increaseQty() {
    setQty(qty + 1)
    increaseQuantity(product)
  }

  function decreaseQty() {
    if (qty === 1) return
    setQty(qty - 1)
    decreaseQuantity(product)
  }

  return (
    <>
      <Head>
        <title>Product | Crwn Clothing</title>
      </Head>

      {product ? (
        <div className='max-w-[768px] mx-auto'>
          <div className='flex flex-col lg:flex-row items-start justify-center gap-10 mb-6'>
            <img
              src={product.imageUrl}
              alt={product.name}
              className='w-full lg:w-[400px] h-[400px] object-cover'
            />
            <div className='flex flex-col gap-2 lg:gap-4'>
              <h2 className='text-[36px]'>
                {product.name}
              </h2>
              <p className='leading-7 mb-2'>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                Dictumst quisque sagittis purus sit.
                Et egestas quis ipsum suspendisse ultrices gravida dictum.
              </p>
              <div className='flex items-center justify-between'>
                <p className='text-[22px] lg:text-[24px]'>
                  Price: ${product.price}
                </p>
                <div className='flex items-center gap-2'>
                  <button className='cursor-pointer' onClick={decreaseQty}>
                    <HiOutlineMinus className='text-2xl' />
                  </button>
                  <span className='text-2xl bg-gray-100 py-2 px-4'>
                    {qty}
                  </span>
                  <button className='cursor-pointer' onClick={increaseQty}>
                    <HiOutlinePlus className='text-2xl' />
                  </button>
                </div>
              </div>
              <button
                className='bg-black hover:bg-gray-800 text-white mt-4 py-2 px-4 rounded'
                onClick={() => addItemToCart(product, qty)}
              >
                Add to cart
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className='flex items-center justify-center'>
          <p className='text-[36px]'>
            Loading...
          </p>
        </div>
      )}
    </>
  )
}
