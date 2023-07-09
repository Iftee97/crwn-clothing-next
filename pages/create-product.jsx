import Head from 'next/head'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { toast } from 'react-toastify'
import axios from 'axios'

export default function CreateProduct({ categories }) {
  const [title, setTitle] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [price, setPrice] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()

  async function handleSubmit(e) {
    e.preventDefault()
    try {
      setIsSubmitting(true)
      const { data } = await axios.post('/api/products/create', {
        title,
        imageUrl,
        price,
        description,
        category
      })
      console.log('data: >>>>>>>>>', data)
      toast.success(data.message)
      router.push('/')
    } catch (error) {
      console.log('error: >>>>>>>>>', error)
      toast.error(error?.response?.data?.message)
    } finally {
      setIsSubmitting(false)
      setTitle('')
      setImageUrl('')
      setPrice('')
      setDescription('')
      setCategory('')
    }
  }

  return (
    <>
      <Head>
        <title>Create Product | Crwn Clothing</title>
      </Head>

      <div>
        <h1 className='font-bold text-center text-4xl my-6'>
          Create Product
        </h1>
        <form
          className='flex flex-col items-center justify-center text-lg gap-3 mb-6'
          onSubmit={handleSubmit}
        >
          <div className='form-group mb-2'>
            <label htmlFor='title' className='block'>
              Title
            </label>
            <input
              type='string'
              name='title'
              className='border border-[#333] p-2 focus:outline-none rounded text-base min-w-[300px] tracking-[0.1rem]'
              placeholder='e.g. Hats'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className='form-group mb-2'>
            <label htmlFor='imageUrl' className='block'>
              Image Url
            </label>
            <input
              type='text'
              name='imageUrl'
              className='border border-[#333] p-2 focus:outline-none rounded text-base min-w-[300px] tracking-[0.1rem]'
              placeholder='http://example.com/image.png'
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              required
            />
          </div>
          <div className='form-group mb-2'>
            <label htmlFor='price' className='block'>
              Price
            </label>
            <input
              type='number'
              name='price'
              className='border border-[#333] p-2 focus:outline-none rounded text-base min-w-[300px] tracking-[0.1rem]'
              placeholder='e.g. 10'
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </div>
          <div className='form-group mb-2'>
            <label htmlFor='description' className='block'>
              Description
            </label>
            <textarea
              name='description'
              className='border border-[#333] p-2 focus:outline-none rounded text-base min-w-[300px] tracking-[0.1rem]'
              placeholder='e.g. This is a description'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          <div className='form-group mb-2'>
            <label htmlFor='category' className='block'>
              Category
            </label>
            <select
              name='category'
              className='border border-[#333] p-2 focus:outline-none rounded text-base min-w-[300px] tracking-[0.1rem]'
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            >
              <option value=''>Select a category</option>
              {categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.title}
                </option>
              ))}
            </select>
          </div>
          <button
            type='submit'
            disabled={isSubmitting || !title || !imageUrl}
            className={`
            bg-black hover:bg-gray-800 text-white py-2 px-4 rounded mt-2  
              ${isSubmitting && 'cursor-not-allowed opacity-50'}
            `}
          >
            {isSubmitting ? 'loading...' : 'Create'}
          </button>
        </form>
      </div>
    </>
  )
}

export async function getServerSideProps(ctx) {
  const { req } = ctx
  const { isAdmin } = req.cookies

  if (isAdmin !== 'true') {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }

  const res = await fetch('http://localhost:3000/api/categories')
  const data = await res.json()

  return {
    props: {
      categories: data.categories,
    }
  }
}
