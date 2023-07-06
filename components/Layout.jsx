import React from 'react'
import Header from './Header'

export default function Layout({ children }) {
  return (
    <>
      <Header />
      <main className='max-w-[1440px] mx-auto px-16 py-10'>
        {children}
      </main>
    </>
  )
}
