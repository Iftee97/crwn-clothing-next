import { useState, useContext } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { AppContext } from '../context/AppContext'
import { AuthContext } from '@/context/AuthContext'
import { HiOutlineX } from 'react-icons/hi'
import UserDropdown from './UserDropdown'

export default function HiddenSidebar() {
  const { showSidebar, toggleSidebar } = useContext(AppContext)
  const { loggedInUserName, isAdminUser } = useContext(AuthContext)
  const [showPopover, setShowPopover] = useState(false)

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
        <div className='flex items-center justify-between p-[18px] shadow-md'>
          <Link
            href='/'
            className='logo-container'
            onClick={toggleSidebar}
          >
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
          <button
            className='inline-block cursor-pointer'
            onClick={toggleSidebar}
          >
            <HiOutlineX className='text-2xl' />
          </button>
        </div>
        <div className='flex flex-col items-center justify-center gap-6 mt-[12px] p-[18px] font-normal'>
          <Link
            href='/'
            className='nav-link cursor-pointer'
            onClick={toggleSidebar}
          >
            HOME
          </Link>
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
          {loggedInUserName && (
            <div className='relative'>
              <span
                className='bg-blue-200 py-1 px-2 rounded cursor-pointer inline-block'
                onClick={() => setShowPopover(!showPopover)}
              >
                {loggedInUserName} {' '}
                {isAdminUser && <span>(admin)</span>}
              </span>
              {showPopover && <UserDropdown />}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
