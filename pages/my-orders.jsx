import React from 'react'
import Head from 'next/head'

export default function MyOrders() {
  return (
    <>
      <Head>
        <title>My Orders | Crwn Clothing</title>
      </Head>
      <div>MyOrders</div>
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
