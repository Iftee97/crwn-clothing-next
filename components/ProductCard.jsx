export default function ProductCard({ product }) {
  const { imageUrl, name, price } = product

  return (
    <div className='product-card-container w-full flex flex-col items-center h-[350px] relative mb-[28px] lg:mb-0'>
      <img
        src={imageUrl}
        alt={name}
        className='w-full h-[95%] object-cover mb-[6px] hover:opacity-80'
      />
      <div className='footer w-full h-[5%] flex justify-between text-[18px]'>
        <span className='name w-[90%] mb-[16px]'>
          {name}
        </span>
        <span className='price w-[10%]'>
          ${price}
        </span>
      </div>
    </div>
  )
}