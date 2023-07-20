import Head from 'next/head'
import { useState, useEffect, useContext } from 'react'
import { useRouter } from 'next/router'
import { CartContext } from '@/context/CartContext'
import { HiOutlinePlus, HiOutlineMinus } from 'react-icons/hi'

export default function SingleProduct() {
  const router = useRouter()
  const { product: productTitle } = router.query
  const { addItemToCart, increaseQuantity, decreaseQuantity, isCartOpen, setIsCartOpen } = useContext(CartContext)
  const [productLoading, setProductLoading] = useState(false)
  const [product, setProduct] = useState(null)
  const [qty, setQty] = useState(1)

  useEffect(() => {
    if (productTitle) {
      document.title = `${productTitle} | Crwn Clothing`
      getProductByTitle(productTitle)
    }
  }, [productTitle])

  async function getProductByTitle(title) {
    if (!title) return
    try {
      setProductLoading(true)
      const res = await fetch(`/api/products/get-product-by-title?title=${title}`)
      const data = await res.json()
      setProduct(data.product)
    } catch (error) {
      console.log('error: >>>>>>>>>', error)
    } finally {
      setProductLoading(false)
    }
  }

  function increaseQty() {
    setQty(qty + 1)
    increaseQuantity(product)
  }

  function decreaseQty() {
    if (qty === 1) return
    setQty(qty - 1)
    decreaseQuantity(product)
  }

  function addToCartHandler() {
    addItemToCart(product, qty)
    setIsCartOpen(true)
  }

  let content = null
  if (productLoading) {
    content = <h2 className='text-center text-2xl font-medium'>
      Loading...
    </h2>
  }
  if (!productLoading && !product) {
    content = <h2 className='text-2xl font-medium'>
      No product found.
    </h2>
  }
  if (!productLoading && product) {
    content = (
      <div className='max-w-[768px] mx-auto'>
        <div className='flex flex-col lg:flex-row items-start justify-center gap-10 mb-6'>
          <img
            src={product.imageUrl}
            alt={product.title}
            className='w-[400px] h-[400px] object-cover'
          />
          <div className='flex flex-col gap-2 lg:gap-4'>
            <h2 className='text-[36px] text-center font-semibold'>
              {product.title}
            </h2>
            <p className='leading-7 mb-2'>
              {product.description}
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
              onClick={addToCartHandler}
            >
              Add to cart
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      <Head>
        <title>
          {productTitle ? `${productTitle} | Crwn Clothing` : 'Product | Crwn Clothing'}
        </title>
      </Head>

      <>
        {content}
      </>
    </>
  )
}
