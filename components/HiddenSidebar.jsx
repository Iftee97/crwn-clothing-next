import { useContext } from 'react'
import Link from 'next/link'
import { AppContext } from '../context/AppContext'
import { HiOutlineX, HiOutlineShoppingBag } from 'react-icons/hi'

export default function HiddenSidebar() {
  const { showSidebar, toggleSidebar } = useContext(AppContext)

  return (
    <div
      className={`
        fixed top-0 left-0 z-[999] block w-screen h-screen
        ${showSidebar
          ? 'w-full translate-x-0 transition-all ease-in-out duration-500'
          : 'translate-x-[-300%] transition-all ease-in-out duration-500'}
      `}
    >
      <div className='block overflow-auto bg-[#fff] h-full'>
        <div className='flex items-center justify-between p-[18px]'>
          <Link
            href='/'
            className='text-2xl font-semibold'
            onClick={toggleSidebar}
          >
            Ecomm_App
          </Link>
          <button
            className='inline-block cursor-pointer'
            onClick={toggleSidebar}
          >
            <HiOutlineX className='text-2xl' />
          </button>
        </div>
        <div className='flex flex-col items-center justify-center gap-4 p-[18px] font-normal'>
          <Link
            href='/shop'
            className='nav-link cursor-pointer'
            onClick={toggleSidebar}
          >
            SHOP
          </Link>
          <Link
            href='/sign-in'
            className='nav-link cursor-pointer'
            onClick={toggleSidebar}
          >
            SIGN IN
          </Link>
          <button className='cart-icon cursor-pointer flex items-center gap-2'>
            <HiOutlineShoppingBag className='text-2xl' />
            <span>(0)</span>
          </button>
        </div>
      </div>
    </div>
  )
}
