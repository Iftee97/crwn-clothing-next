import React from 'react'
import Link from 'next/link'

export default function SignIn() {
  return (
    <div>
      <h1 className='font-bold text-center text-4xl mb-4'>
        Sign Up
      </h1>
      <div>
        Don't have an account? {' '}
        <Link href='/sign-up' className='text-blue-500 hover:text-blue-600'>
          Sign Up
        </Link>
      </div>
    </div>
  )
}
