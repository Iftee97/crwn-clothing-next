import "@/styles/globals.css";
import { Montserrat } from "next/font/google";
import { Layout } from "@/components/Layout";
import { AppContextProvider } from "@/context/AppContext";
import { AuthContextProvider } from "@/context/AuthContext";
import { CartContextProvider } from "@/context/CartContext";
import { StripeProvider } from "@/components/StripeProvider";
import { ToastContainer } from "react-toastify";
import NextTopLoader from "nextjs-toploader";
import "react-toastify/dist/ReactToastify.css";

const montserrat = Montserrat({
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal"],
  subsets: ["latin"],
});

export default function App({ Component, pageProps }) {
  return (
    <>
      {/* <style jsx global>{`
        html {
          font-family: ${montserrat.style.fontFamily};
        }
      `}</style> */}
      <StyleBlock />

      <AppContextProvider>
        <AuthContextProvider>
          <CartContextProvider>
            <Layout>
              <StripeProvider>
                <ToastContainer position="bottom-center" theme="dark" />
                <NextTopLoader showSpinner={false} color="#020617" easing="linear" initialPosition={0.3} speed={500} crawlSpeed={200} />
                <Component {...pageProps} />
              </StripeProvider>
            </Layout>
          </CartContextProvider>
        </AuthContextProvider>
      </AppContextProvider>
    </>
  );
}

function StyleBlock() {
  return (
    <style jsx global>{`
      html {
        font-family: ${montserrat.style.fontFamily};
      }
    `}</style>
  );
}