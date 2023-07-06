import { useContext } from 'react'
import Link from 'next/link'
import { AppContext } from '../context/AppContext'
import { HiOutlineMenu, HiOutlineShoppingBag } from 'react-icons/hi'

export default function Navbar() {
  const { toggleSidebar } = useContext(AppContext)

  return (
    <nav className='navigation h-[70px] w-full flex justify-between items-center p-[18px] md:p-[24px]'>
      <Link href='/' className='logo-container text-2xl font-semibold'>
        Ecomm_App
      </Link>
      <div className='nav-links-container h-full hidden md:flex items-center gap-4 font-normal'>
        <Link href='/shop' className='nav-link cursor-pointer'>
          SHOP
        </Link>
        <Link href='/sign-in' className='nav-link cursor-pointer'>
          SIGN IN
        </Link>
        <button className='cart-icon cursor-pointer flex items-center gap-2'>
          <HiOutlineShoppingBag className='text-2xl' />
          <span>(0)</span>
        </button>
      </div>
      <button
        className='inline-block md:hidden cursor-pointer'
        onClick={toggleSidebar}
      >
        <HiOutlineMenu className='text-2xl font-normal' />
      </button>
    </nav>
  )
}
