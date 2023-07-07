import { useEffect, useState } from 'react'
import Head from 'next/head'
import UserItem from '@/components/UserItem'
import axios from 'axios'

export default function AllUsers() {
  const [users, setUsers] = useState([])
  const [usersLoading, setUsersLoading] = useState(false)

  useEffect(() => {
    getAllUsers()
  }, [])

  async function getAllUsers() {
    try {
      setUsersLoading(true)
      const { data } = await axios.get('/api/users/')
      setUsers(data)
    } catch (error) {
      console.log('error: >>>>>>>>', error)
    } finally {
      setUsersLoading(false)
    }
  }

  let content = null
  if (usersLoading) {
    content = <h2 className='flex items-center justify-center'>
      Loading...
    </h2>
  }
  if (!usersLoading && users.length === 0) {
    content = <h2 className='flex items-center justify-center'>
      You have no users
    </h2>
  }
  if (!usersLoading && users.length > 0) {
    content = users.map(user => (
      <UserItem key={user._id} user={user} />
    ))
  }

  return (
    <>
      <Head>
        <title>All Users | Crwn Clothing</title>
      </Head>

      <div className='flex flex-col items-center justify-center'>
        <h1 className='text-3xl font-bold mb-6'>
          All Users ({users.length})
        </h1>
        <div className='flex flex-col items-center justify-center gap-4'>
          {content}
        </div>
      </div>
    </>
  )
}

// route guard - if user is not admin, redirect to home page
export async function getServerSideProps(ctx) {
  const { req, res } = ctx
  const { isAdmin } = req.cookies

  if (isAdmin !== 'true') {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }

  return {
    props: {
      // 
    }
  }
}
