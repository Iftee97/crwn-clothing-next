import Layout from '@/components/Layout'
import StripeProvider from '@/components/StripeProvider'
import AppContextProvider from '@/context/AppContext'
import AuthContextProvider from '@/context/AuthContext'
import CartContextProvider from '@/context/CartContext'
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
          <CartContextProvider>
            <Layout>
              <StripeProvider>
                <Component {...pageProps} />
              </StripeProvider>
              <ToastContainer position='bottom-center' theme='dark' />
            </Layout>
          </CartContextProvider>
        </AuthContextProvider>
      </AppContextProvider>
    </>
  )
}
