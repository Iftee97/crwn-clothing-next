import { useState, useEffect, useContext } from 'react'
import Head from 'next/head'
import { AppContext } from '@/context/AppContext'
import { useRouter } from 'next/router'
import ProductCard from '@/components/ProductCard'

export default function Category() {
  const router = useRouter()
  const { category } = router.query
  const { categories } = useContext(AppContext)
  const [products, setProducts] = useState([])

  useEffect(() => {
    if (category) {
      document.title = `${category} | Crwn Clothing`
    }
  }, [category])

  useEffect(() => {
    if (categories && categories?.length > 0) {
      const c = categories?.find(cat => cat.title === category)
      if (!c) return
      setProducts(c.items)
    }
  }, [categories, category])

  return (
    <>
      <Head>
        <title>Shop | Crwn Clothing</title>
      </Head>

      <h2 className='category-title text-[36px] mb-[24px] text-center'>
        {category?.toUpperCase()}
      </h2>
      <div className='category-container grid grid-cols-1 lg:grid-cols-4 gap-x-[0] lg:gap-x-[20px]'>
        {products?.map((product) => (
          <div key={product.id} className='mb-[24px]'>
            <ProductCard categoryTitle={category} product={product} />
          </div>
        ))}
      </div>
    </>
  )
}
