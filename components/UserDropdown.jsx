import { useContext } from 'react'
import Link from 'next/link'
import { AppContext } from '@/context/AppContext'
import { AuthContext } from '@/context/AuthContext'
import Cookies from 'js-cookie'

export default function UserDropDown() {
  const { showSidebar, toggleSidebar } = useContext(AppContext)
  const { setLoggedInUserName, isAdminUser } = useContext(AuthContext)

  function handleSignOut() {
    setLoggedInUserName('')
    localStorage.removeItem('loggedInUserData')
    Cookies.remove('token')
  }

  return (
    <div className='p-3 bg-white shadow-md rounded-md absolute top-[35px] right-[-75px] w-[150px]'>
      <div className='flex flex-col items-center gap-2'>
        {isAdminUser && (
          <>
            <Link
              href='/all-orders'
              className='text-sm hover:underline'
              onClick={toggleSidebar}
            >
              All orders
            </Link>
            <Link
              href='/all-users'
              className='text-sm hover:underline'
              onClick={toggleSidebar}
            >
              Users List
            </Link>
          </>
        )}
        <Link href='/orders' className='text-sm hover:underline'>
          My orders
        </Link>
        <button
          className='text-sm text-red-500 hover:underline border-none'
          onClick={() => {
            handleSignOut()
            toggleSidebar()
          }}
        >
          sign out
        </button>
      </div>
    </div>
  )
}
