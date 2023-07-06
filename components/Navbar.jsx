import { useContext } from 'react'
import Link from 'next/link'
import { AppContext } from '../context/AppContext'
import { HiOutlineMenu } from 'react-icons/hi'

export default function Navbar() {
  const { toggleSidebar } = useContext(AppContext)

  return (
    <nav className='h-[70px] w-full flex justify-between items-center p-[18px] md:p-[24px]'>
      <Link href='/' className='text-2xl font-semibold'>
        Ecomm_App
      </Link>
      <div className='h-full hidden md:flex items-center gap-4 font-medium'>
        <Link href='/shop' className='nav-link cursor-pointer'>
          SHOP
        </Link>
        <Link href='/sign-in' className='nav-link cursor-pointer'>
          SIGN IN
        </Link>
      </div>
      <button
        className='inline-block md:hidden cursor-pointer'
        onClick={toggleSidebar}
      >
        <HiOutlineMenu className='text-2xl' />
      </button>
    </nav>
  )
}
