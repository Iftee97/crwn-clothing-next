import { useContext } from 'react'
import Link from 'next/link'
import { AppContext } from '@/context/AppContext'
import { AuthContext } from '@/context/AuthContext'

export default function UserDropdown() {
  const { showSidebar, setShowSidebar } = useContext(AppContext)
  const { user, handleSignOut } = useContext(AuthContext)

  function dontShowSidebar() {
    if (showSidebar) {
      setShowSidebar(false)
    }
  }

  return (
    <div className='p-3 bg-white shadow-md rounded-md absolute top-[35px] right-[-75px] z-[999] w-[150px]'>
      <div className='flex flex-col items-center gap-2'>
        {user.isAdmin && (
          <>
            <Link
              href='/all-users'
              className='text-sm hover:underline'
              onClick={dontShowSidebar}
            >
              Users List
            </Link>
            <Link
              href='/all-orders'
              className='text-sm hover:underline'
              onClick={dontShowSidebar}
            >
              All orders
            </Link>
          </>
        )}
        <Link
          href='/my-orders'
          className='text-sm hover:underline'
          onClick={dontShowSidebar}
        >
          My orders
        </Link>
        <button
          className='text-sm text-red-500 hover:underline border-none'
          onClick={() => {
            handleSignOut()
            dontShowSidebar()
          }}
        >
          Sign Out
        </button>
      </div>
    </div>
  )
}
