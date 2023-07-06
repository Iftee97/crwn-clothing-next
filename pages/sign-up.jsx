import { useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import axios from 'axios'
import Cookies from 'js-cookie'
import { toast } from 'react-toastify'

export default function SignUp() {
  const router = useRouter()
  // const [signupError, setSignupError] = useState(null)

  return (
    <>
      <Head>
        <title>Sign Up | Ecomm App</title>
      </Head>

      <div>
        <h1 className='font-bold text-center text-4xl my-6'>
          Sign Up
        </h1>
        <Formik
          initialValues={{
            phone: '',
            username: '',
            password: ''
          }}
          validate={values => {
            const errors = {}
            if (!values.phone) {
              errors.phone = 'Phone number is required'
            } else if (values.phone.startsWith('+880') === false) {
              errors.phone = 'Not a valid Bangladeshi phone number, must begin with +880'
            }
            if (!values.username) {
              errors.username = 'Username is required'
            } else if (values.username.length < 3) {
              errors.username = 'Username must be at least 3 characters'
            }
            if (!values.password) {
              errors.password = 'Password is required'
            } else if (values.password.length < 6) {
              errors.password = 'Password must be at least 6 characters'
            }
            return errors
          }}
          onSubmit={async (values, { setSubmitting }) => {
            setSubmitting(true)
            try {
              const { data: data } = await axios.post('/api/users/sign-up', values)
              console.log('sign up data: >>>>>>>>>', data)
              localStorage.setItem('loggedInUserData', JSON.stringify({
                username: data.username,
                phone: data.phone,
                token: data.token
              }))
              Cookies.set('token', data.token)
              toast.success(data.message, { theme: 'dark' })
              router.push('/')
            } catch (error) {
              console.log('error: >>>>>>>>>', error)
            } finally {
              setSubmitting(false)
              values.phone = ''
              values.username = ''
              values.password = ''
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form className='flex flex-col items-center justify-center gap-3 mb-6'>
              <div className='form-group mb-2'>
                <label htmlFor="phone" className='block'>
                  Phone
                </label>
                <Field
                  type="string"
                  name="phone"
                  className='border border-[#333] p-2 focus:outline-none rounded text-sm min-w-[300px]'
                  placeholder='+8801711234567'
                />
                <ErrorMessage
                  name="phone"
                  component="div"
                  className='text-sm text-red-500'
                />
              </div>
              <div className='form-group mb-2'>
                <label htmlFor="username" className='block'>
                  Username
                </label>
                <Field
                  type="text"
                  name="username"
                  className='border border-[#333] p-2 focus:outline-none rounded text-sm min-w-[300px]'
                  placeholder='jon_doe'
                />
                <ErrorMessage
                  name="username"
                  component="div"
                  className='text-sm text-red-500'
                />
              </div>
              <div className='form-group mb-2'>
                <label htmlFor="password" className='block'>
                  Password
                </label>
                <Field
                  type="password"
                  name="password"
                  className='border border-[#333] p-2 focus:outline-none rounded text-sm min-w-[300px]'
                  placeholder='********'
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className='text-sm text-red-500'
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`
                  bg-zinc-900 hover:bg-zinc-950 text-white py-2 px-4 rounded 
                  ${isSubmitting && 'cursor-not-allowed opacity-50'}
                `}
              >
                {isSubmitting ? 'Submitting...' : 'Submit'}
              </button>
            </Form>
          )}
        </Formik>
        <div className='text-center'>
          Already have an account? {' '}
          <Link href='/sign-in' className='text-blue-500 hover:text-blue-600'>
            Sign In
          </Link>
        </div>
      </div>
    </>
  )
}


// route guard - if user is logged in, redirect to home page
export async function getServerSideProps(ctx) {
  const { req, res } = ctx
  const { token } = req.cookies

  if (token) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }

  return {
    props: {
      // 
    }
  }
}
