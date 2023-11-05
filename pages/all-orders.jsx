import Head from 'next/head'
import { useEffect, useState } from 'react'
import OrderItem from '@/components/OrderItem'
import axios from 'axios'
import Cookies from 'js-cookie'

export default function AllOrders() {
  const [orders, setOrders] = useState([])
  const [ordersLoading, setOrdersLoading] = useState(false)
  const [ordersError, setOrdersError] = useState(null)

  useEffect(() => {
    getAllOrders()
  }, [])

  async function getAllOrders() {
    try {
      setOrdersLoading(true)
      const { data } = await axios.get('/api/orders/', {
        headers: {
          Authorization: `Bearer ${Cookies.get('token')}`,
          isAdmin: Cookies.get('isAdmin')
        }
      })
      console.log('orders: >>>>>>>>', data)
      setOrders(data)
    } catch (error) {
      console.log('error: >>>>>>>>', error)
      setOrdersError(error.message)
    } finally {
      setOrdersLoading(false)
    }
  }

  // async function deleteOrder(id) {
  //   try {
  //     await axios.delete(`/api/orders/delete-order?id=${id}`)
  //     setOrders(prevOrders => prevOrders.filter(order => order._id !== id))
  //   } catch (error) {
  //     console.log('error: >>>>>>>>', error)
  //   }
  // }

  let content = null
  if (ordersLoading) {
    content = <h2 className='flex items-center justify-center'>
      Loading...
    </h2>
  } else if (orders.length === 0) {
    content = <h2 className='flex items-center justify-center'>
      No orders to show
    </h2>
  } else {
    content = orders.map(order => (
      <OrderItem
        key={order._id}
        order={order}
      // deleteOrder={deleteOrder}
      />
    ))
  }

  return (
    <>
      <Head>
        <title>All Orders | Crwn Clothing</title>
      </Head>

      <div className='flex flex-col items-center justify-center'>
        <h1 className='text-3xl font-bold mb-6'>
          All Orders ({orders.length})
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
