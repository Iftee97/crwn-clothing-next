import Head from 'next/head'
import CategoryItem from '@/components/CategoryItem'

export default function Home({ data }) {
  console.log('data: >>>>>>>>>', data)

  const categories = [
    {
      id: 1,
      title: 'Hats',
      imageUrl: 'https://i.ibb.co/cvpntL1/hats.png',
    },
    {
      id: 2,
      title: 'Jackets',
      imageUrl: 'https://i.ibb.co/px2tCc3/jackets.png',
    },
    {
      id: 3,
      title: 'Sneakers',
      imageUrl: 'https://i.ibb.co/0jqHpnp/sneakers.png',
    },
    {
      id: 4,
      title: 'Womens',
      imageUrl: 'https://i.ibb.co/GCCdy8t/womens.png',
    },
    {
      id: 5,
      title: 'Mens',
      imageUrl: 'https://i.ibb.co/R70vBrQ/men.png',
    },
  ]

  return (
    <>
      <Head>
        <title>Home | Crwn Clothing</title>
      </Head>

      <main>
        <div className='category-container w-full grid grid-cols-1 gap-4 md:grid-cols-2 lg:flex lg:gap-0 flex-wrap justify-between'>
          {categories.map((category) => (
            <CategoryItem key={category.id} category={category} />
          ))}
        </div>
      </main>
    </>
  )
}

export async function getServerSideProps() {
  const res = await fetch('http://localhost:3000/api/categories')
  const data = await res.json()

  return {
    props: {
      data: data.categories,
    }
  }
}
