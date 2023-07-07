import React from 'react'
import Head from 'next/head'

export default function AllOrders() {
  return (
    <>
      <Head>
        <title>All Orders | Crwn Clothing</title>
      </Head>
      <div>AllOrders</div>
    </>
  )
}

// route guard - if user is not admin, redirect to home page
export async function getServerSideProps(ctx) {
  const { req, res } = ctx
  const { isAdmin } = req.cookies

  if (!isAdmin) {
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
