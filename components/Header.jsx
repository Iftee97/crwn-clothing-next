import React from 'react'
import Navbar from './Navbar'
import HiddenSidebar from './HiddenSidebar'

export default function Header() {
  return (
    <header>
      <HiddenSidebar />
      <Navbar />
    </header>
  )
}
