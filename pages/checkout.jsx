import Head from 'next/head'
import { useRouter } from 'next/router'
import { useState, useEffect, useContext } from 'react'
import { CartContext } from '@/context/CartContext'
import { AuthContext } from '@/context/AuthContext'
import CheckoutItem from '@/components/CheckoutItem'
import axios from 'axios'
import { toast } from 'react-toastify'

export default function Checkout() {
  const { cartItems, getCartTotal, clearCart } = useContext(CartContext)
  const { user } = useContext(AuthContext)
  const [items, setItems] = useState([])
  const [cartTotal, setCartTotal] = useState(0)
  const [checkoutLoading, setCheckoutLoading] = useState(false)
  const [checkoutError, setCheckoutError] = useState(null)
  const router = useRouter()

  console.log('user: >>>>>>>>', user)

  // to avoid weird hydration mismatch error
  useEffect(() => {
    setItems(cartItems)
    setCartTotal(getCartTotal())
  }, [cartTotal, cartItems, getCartTotal])

  async function handleCheckout() {
    if (!user._id) {
      alert('You must be logged in to checkout.')
      router.push('/sign-in')
      return
    }
    try {
      setCheckoutLoading(true)
      const res = await axios.post('/api/orders/create-order', {
        user: user._id,
        items: cartItems,
        total: cartTotal,
      })
      console.log('res: >>>>>>>>', res)
      toast.success('Order placed successfully!')
      clearCart()
      router.push('/my-orders')
    } catch (error) {
      console.log('error: >>>>>>>>', error)
      setCheckoutError(error)
      alert('There was an error processing your order. Please try again.')
    } finally {
      setCheckoutLoading(false)
    }
  }

  return (
    <>
      <Head>
        <title>Checkout | Crwn Clothing</title>
      </Head>

      <div className='checkout-container max-w-[800px] min-h-[90vh] mt-[16px] lg:mt-[40px] mx-auto mb-0 flex flex-col items-center'>
        {items?.length > 0 ? (
          <>
            <div className='checkout-header w-full py-[10px] hidden lg:flex border-b border-gray-400'>
              <div className='header-block w-[23%]'>
                <span>Image</span>
              </div>
              <div className='header-block w-[23%]'>
                <span>Title</span>
              </div>
              <div className='header-block w-[23%]'>
                <span>Quantity</span>
              </div>
              <div className='header-block w-[23%]'>
                <span>Price</span>
              </div>
              <div className='header-block w-[8%]'>
                <span>Remove</span>
              </div>
            </div>
            {cartItems.map((cartItem) => (
              <CheckoutItem key={cartItem.id} cartItem={cartItem} />
            ))}
            <div className='w-full flex items-center justify-between mt-6'>
              <span className='total text-[32px]'>
                Total: ${cartTotal.toLocaleString()}
              </span>
              <button
                type='button'
                className={`
                  bg-black hover:bg-gray-800 text-white py-2 px-4 rounded 
                  ${checkoutLoading && 'opacity-50 cursor-not-allowed'}
                `}
                disabled={checkoutLoading}
                onClick={handleCheckout}
              >
                {/* Checkout */}
                {checkoutLoading ? 'Processing...' : 'Checkout'}
              </button>
            </div>
          </>
        ) : (
          <div className='empty-message mt-[1rem] text-[1.75rem] font-medium'>
            Your cart is empty.
          </div>
        )}
      </div>
    </>
  )
}
