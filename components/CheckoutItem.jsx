import { useState, useEffect, useContext } from 'react'
import { CartContext } from '@/context/CartContext'
import { HiOutlinePlusSm, HiOutlineMinusSm } from 'react-icons/hi'

export default function CheckoutItem({ cartItem }) {
  const { increaseQuantity, decreaseQuantity, removeItemFromCart } = useContext(CartContext)
  const [itemPrice, setItemPrice] = useState('')

  const { title, imageUrl, price, quantity } = cartItem

  // to avoid weird hydration mismatch error
  useEffect(() => {
    setItemPrice(price.toLocaleString())
  }, [])

  return (
    <div className='checkout-item-container w-full flex flex-col lg:flex-row items-center text-[24px] lg:text-[20px] py-[15px] min-h-[100px] border-b border-gray-400 text-center lg:text-left font-light'>
      <div className='image-container w-full lg:w-[23%] pr-0 lg:pr-[15px]'>
        <img
          src={imageUrl}
          alt={name}
          className='w-full h-full object-cover'
        />
      </div>
      <span className='name font-medium w-full lg:w-[23%] pr-0 lg:pr-[12px]'>
        {title}
      </span>
      <span className='quantity w-full lg:w-[23%] flex items-center justify-center lg:justify-start gap-4 lg:gap-2'>
        <div
          className='arrow cursor-pointer'
          onClick={() => decreaseQuantity(cartItem)}
        >
          <HiOutlineMinusSm />
        </div>
        <span className='value my-2 mb-[10px] bg-gray-100 py-2 px-4'>
          {quantity}
        </span>
        <div
          className='arrow cursor-pointer'
          onClick={() => increaseQuantity(cartItem)}
        >
          <HiOutlinePlusSm />
        </div>
      </span>
      <span className='price w-full lg:w-[23%]'>
        ${itemPrice}
      </span>
      <>
        {/* larger screens */}
        <div
          className='hidden lg:block remove-button w-[8%] text-center cursor-pointer'
          onClick={() => removeItemFromCart(cartItem)}
        >
          &#10005;
        </div>
        {/* mobile screens */}
        <div
          className='block lg:hidden remove-button cursor-pointer text-red-500 text-[18px] mt-2'
          onClick={() => removeItemFromCart(cartItem)}
        >
          &#10005; remove item
        </div>
      </>
    </div>
  )
}
