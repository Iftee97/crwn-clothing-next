import { useEffect, useState, useContext } from 'react'
import { AuthContext } from '@/context/AuthContext'
import Head from 'next/head'
import axios from 'axios'

export default function MyOrders() {
  const [orders, setOrders] = useState([])
  const [ordersLoading, setOrdersLoading] = useState(false)
  const { user } = useContext(AuthContext)

  useEffect(() => {
    getOrders()
  }, [])

  async function getOrders() {
    try {
      setOrdersLoading(true)
      const { data } = await axios.post('/api/orders/my-orders', {
        user: user._id
      })
      setOrders(data)
    } catch (error) {
      console.log('error: >>>>>>>>', error)
    } finally {
      setOrdersLoading(false)
    }
  }

  console.log('orders: >>>>>>>>', orders)

  return (
    <>
      <Head>
        <title>My Orders | Crwn Clothing</title>
      </Head>

      {ordersLoading ? 'loading...' : (
        <div>MyOrders</div>
      )}
    </>
  )
}

// route guard - if user is not logged in, redirect to home page
export async function getServerSideProps(ctx) {
  const { req, res } = ctx
  const { token } = req.cookies

  if (!token) {
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
