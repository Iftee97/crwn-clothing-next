import Head from 'next/head'
import { useContext } from 'react'
import { AppContext } from '@/context/AppContext'
import CategoryPreview from '@/components/CategoryPreview'

export default function Shop() {
  const { categories, categoriesLoading } = useContext(AppContext)
  // console.log({ categories, categoriesLoading })

  let content = null
  if (categoriesLoading) {
    content = <h2>Loading...</h2>
  }
  if (!categoriesLoading && categories.length === 0) {
    content = <h2>No categories found.</h2>
  }
  if (!categoriesLoading && categories.length > 0) {
    content = categories.map((category) => (
      <CategoryPreview key={category.id} category={category} />
    ))
  }

  return (
    <>
      <Head>
        <title>Shop | Ecomm App</title>
      </Head>

      <div className='shop-container flex flex-col'>
        {content}
      </div>
    </>
  )
}
