import React from 'react'
import Head from 'next/head'
import Link from 'next/link'

export default function SignIn() {
  return (
    <>
      <Head>
        <title>Sign In | Ecomm App</title>
      </Head>

      <div>
        <h1 className='font-bold text-center text-4xl mb-4'>
          Sign In
        </h1>
        <div>
          Don't have an account? {' '}
          <Link href='/sign-up' className='text-blue-500 hover:text-blue-600'>
            Sign Up
          </Link>
        </div>
      </div>
    </>
  )
}
