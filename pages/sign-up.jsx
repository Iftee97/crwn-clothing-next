import React from 'react'
import Head from 'next/head'
import Link from 'next/link'

export default function SignUp() {
  return (
    <>
      <Head>
        <title>Sign Up | Ecomm App</title>
      </Head>

      <div>
        <h1 className='font-bold text-center text-4xl mb-4'>
          Sign Up
        </h1>
        <div>
          Already have an account? {' '}
          <Link href='/sign-in' className='text-blue-500 hover:text-blue-600'>
            Sign In
          </Link>
        </div>
      </div>
    </>
  )
}
