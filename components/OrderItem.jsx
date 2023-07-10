import React from 'react'

export default function OrderItem({ order }) {
  return (
    <div className='border border-gray-300 p-4 rounded flex flex-col items-start w-full'>
      <h2 className='text-2xl font-semibold mb-3'>
        Order ID: {order._id}
      </h2>
      {order.user._id && (
        <h3 className='text-xl mb-6 font-semibold'>
          User ID: {order.user._id}
        </h3>
      )}
      <div className='flex flex-col items-center gap-4 w-full text-lg'>
        {order.items.map((item, index) => (
          <div
            key={item._id || index}
            className='flex items-center justify-between w-full'
          >
            <span className='font-medium'>
              {item.title}
            </span>
            <span>
              {item.quantity} x ${item.price}
            </span>
          </div>
        ))}
        <div>
          Total: {' '}
          <span className='text-blue-700 font-medium'>
            ${order.total}
          </span>
        </div>
      </div>
    </div>
  )
}
