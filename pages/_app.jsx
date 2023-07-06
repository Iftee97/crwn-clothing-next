import Layout from '@/components/Layout'
import AppContextProvider from '@/context/AppContext'
import AuthContextProvider from '@/context/AuthContext'
import { Montserrat } from 'next/font/google'
import { ToastContainer } from 'react-toastify'
import '@/styles/globals.css'
import 'react-toastify/dist/ReactToastify.css'

const montserrat = Montserrat({
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal'],
  subsets: ['latin'],
})

export default function App({ Component, pageProps }) {
  return (
    <>
      <style jsx global>{`
        html {
          font-family: ${montserrat.style.fontFamily};
        }
      `}</style>

      <AppContextProvider>
        <AuthContextProvider>
          <Layout>
            <Component {...pageProps} />
            <ToastContainer theme='dark' />
          </Layout>
        </AuthContextProvider>
      </AppContextProvider>
    </>
  )
}
