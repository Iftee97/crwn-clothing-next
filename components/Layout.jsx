import React from 'react'
import Navbar from './Navbar'

export default function Layout({ children }) {
  return (
    <>
      <Navbar />
      <main className='max-w-[1440px] mx-auto px-16 py-10'>
        {children}
      </main>
    </>
  )
}
