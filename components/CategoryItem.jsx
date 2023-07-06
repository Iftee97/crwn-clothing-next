import React from 'react'
import Link from 'next/link'

export default function CategoryItem({ category }) {
  return (
    <Link
      href={`/shop/${category.title}`}
      className='category-item-container min-w-[30%] h-60 flex flex-auto items-center justify-center border border-black overflow-hidden mx-0 my-[18px] lg:m-2'
    >
      <div
        className="w-full h-full background-image bg-cover bg-center hover:transition-transform hover:delay-0 hover:ease-[custom-cubic] hover:scale-110 hover:duration-[4000ms] hover:opacity-90"
        style={{ backgroundImage: `url(${category.imageUrl})` }}
      />
      <div className="h-[72px] lg:h-[90px] p-[18px] lg:p-[24px] flex flex-col items-center justify-center absolute border border-black bg-white opacity-70 group-hover:opacity-90">
        <h2 className="font-bold mb-1 text-lg text-gray-700">
          {category.title}
        </h2>
        <p className="font-light text-base">
          Shop Now
        </p>
      </div>
    </Link>
  )
}
