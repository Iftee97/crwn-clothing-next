import React from 'react'

export default function OrderItem({ order }) {
  console.log('order: >>>>>>>>', order)

  return (
    <div className='border border-gray-300 p-4 rounded flex flex-col items-center w-full'>
      <h2 className='text-xl font-semibold mb-6'>
        Order ID: {order._id}
      </h2>
      <div className='flex flex-col items-center gap-4 w-full'>
        {order.items.map((item) => (
          <div
            key={item.id}
            className='flex items-center justify-between w-full text-lg'
          >
            <span className='font-medium'>
              {item.name}
            </span>
            <span>
              {item.quantity} x ${item.price}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
