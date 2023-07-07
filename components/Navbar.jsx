import Link from 'next/link'
import Image from 'next/image'
import { useContext, useState, useEffect } from 'react'
import { AppContext } from '../context/AppContext'
import { AuthContext } from '@/context/AuthContext'
import { CartContext } from '@/context/CartContext'
import { HiOutlineMenu, HiOutlineShoppingBag } from 'react-icons/hi'
import Cookies from 'js-cookie'
import SlidingCart from './SlidingCart'

export default function Navbar() {
  const { toggleSidebar } = useContext(AppContext)
  const { loggedInUserName } = useContext(AuthContext)
  const { getCartItemsCount, isCartOpen, setIsCartOpen } = useContext(CartContext)
  const [showPopover, setShowPopover] = useState(false)
  const [cartCount, setCartCount] = useState(0)

  // to avoid weird hydration mismatch error
  useEffect(() => {
    setCartCount(getCartItemsCount())
  }, [getCartItemsCount, cartCount])

  return (
    <nav className='navigation bg-white shadow-md h-[70px] w-full flex justify-between items-center p-[18px] md:p-[24px]'>
      <Link href='/' className='logo-container'>
        <Image
          src='/crwn.svg'
          alt='logo'
          width={40}
          height={40}
          priority={true}
          style={{
            height: 'auto',
            width: 'auto'
          }}
        />
      </Link>
      <div className='nav-links-container h-full hidden md:flex items-center gap-6 font-normal'>
        {loggedInUserName && (
          <div className='relative'>
            <span
              className='bg-blue-200 py-1 px-2 rounded cursor-pointer inline-block'
              onClick={() => setShowPopover(!showPopover)}
            >
              {loggedInUserName}
            </span>
            {showPopover && <UserDropDown />}
          </div>
        )}
        <Link href='/shop' className='nav-link cursor-pointer'>
          SHOP
        </Link>
        {!loggedInUserName && (
          <Link href='/sign-in' className='nav-link cursor-pointer'>
            SIGN IN
          </Link>
        )}
      </div>
      <div className='flex items-center gap-3'>
        <>
          <button
            className='cart-icon cursor-pointer flex items-center gap-1 lg:gap-2 hover:bg-gray-800 hover:text-white py-1 px-2 rounded'
            onClick={() => setIsCartOpen(!isCartOpen)}
          >
            <HiOutlineShoppingBag className='text-2xl' />
            <span>({cartCount})</span>
          </button>
          <SlidingCart />
        </>
        <button
          className='inline-block md:hidden cursor-pointer'
          onClick={toggleSidebar}
        >
          <HiOutlineMenu className='text-2xl font-normal' />
        </button>
      </div>
    </nav>
  )
}

function UserDropDown() {
  const { setLoggedInUserName } = useContext(AuthContext)

  function handleSignOut() {
    setLoggedInUserName('')
    localStorage.removeItem('loggedInUserData')
    Cookies.remove('token')
  }

  return (
    <div className='p-3 bg-white shadow-md rounded-md absolute top-[35px] right-[-75px] w-[150px]'>
      <div className='flex flex-col items-center gap-2'>
        <Link href='/orders' className='text-sm hover:underline'>
          My orders
        </Link>
        <button
          className='text-sm text-red-500 hover:underline border-none'
          onClick={handleSignOut}
        >
          sign out
        </button>
      </div>
    </div>
  )
}
