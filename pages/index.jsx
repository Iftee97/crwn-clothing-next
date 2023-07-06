import Image from 'next/image'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <h1 className='text-4xl text-blue-500 text-center font-bold'>
      Hello Ecomm App & Next 13 Pages Dir.
    </h1>
  )
}
