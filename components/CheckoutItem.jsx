import { useState, useEffect, useContext } from 'react'
import { CartContext } from '@/context/CartContext'

export default function CheckoutItem({ cartItem }) {
  const { increaseQuantity, decreaseQuantity, removeItemFromCart } = useContext(CartContext)
  const [itemPrice, setItemPrice] = useState('')

  const { name, imageUrl, price, quantity } = cartItem

  // to avoid weird hydration mismatch error
  useEffect(() => {
    setItemPrice(price.toLocaleString())
  }, [])

  return (
    <div className='checkout-item-container w-full flex items-center text-[20px] py-[15px] min-h-[100px] border-b border-gray-400'>
      <div className='image-container w-[23%] pr-[15px]'>
        <img
          src={imageUrl}
          alt={name}
          className='w-full h-full object-cover'
        />
      </div>
      <span className='name w-[23%] pr-[12px]'>
        {name}
      </span>
      <span className='quantity w-[23%] flex gap-2 mt-0 lg:mt-3'>
        <div
          className='arrow cursor-pointer'
          onClick={() => decreaseQuantity(cartItem)}
        >
          &#10094;
        </div>
        <span className='value mb-[10px]'>
          {quantity}
        </span>
        <div
          className='arrow cursor-pointer'
          onClick={() => increaseQuantity(cartItem)}
        >
          &#10095;
        </div>
      </span>
      <span className='price w-[23%]'>
        ${itemPrice}
      </span>
      <div
        className='remove-button w-[8%] text-center cursor-pointer'
        onClick={() => removeItemFromCart(cartItem)}
      >
        &#10005;
      </div>
    </div>
  )
}
