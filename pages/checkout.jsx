import Head from 'next/head'
import { useContext } from 'react'
import { CartContext } from '@/context/CartContext'
import CheckoutItem from '@/components/CheckoutItem'
import PaymentForm from '@/components/PaymentForm'

export default function Checkout() {
  const { cartItems, getCartTotal } = useContext(CartContext)

  return (
    <>
      <Head>
        <title>Checkout | Crwn Clothing</title>
      </Head>

      <div className='checkout-container max-w-[800px] min-h-[90vh] mt-[16px] lg:mt-[40px] mx-auto mb-0 flex flex-col items-center'>
        {cartItems?.length > 0 ? (
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
              <CheckoutItem key={cartItem._id} cartItem={cartItem} />
            ))}
            <div className='w-full flex items-center justify-center lg:justify-end mt-6'>
              <span className='total text-[32px]'>
                Total: ${getCartTotal().toLocaleString()}
              </span>
            </div>
            <PaymentForm />
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
