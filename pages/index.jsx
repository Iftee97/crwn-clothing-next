import Head from 'next/head'
import CategoryItem from '@/components/CategoryItem'

export default function Home({ categories }) {
  return (
    <>
      <Head>
        <title>Home | Crwn Clothing</title>
      </Head>

      <main>
        <div className='category-container w-full grid grid-cols-1 gap-4 md:grid-cols-2 lg:flex lg:gap-0 flex-wrap justify-between'>
          {categories.map((category) => (
            <CategoryItem key={category._id} category={category} />
          ))}
        </div>
      </main>
    </>
  )
}

export async function getServerSideProps() {
  const { NEXT_PUBLIC_API_URL } = process.env
  const res = await fetch(`${NEXT_PUBLIC_API_URL}/categories/get-categories-only`)
  const data = await res.json()

  return {
    props: {
      categories: data.categories,
    }
  }
}
