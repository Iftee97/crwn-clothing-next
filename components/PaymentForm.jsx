import { useRouter } from 'next/router'
import { useState, useContext } from 'react'
import { CartContext } from '@/context/CartContext'
import { AuthContext } from '@/context/AuthContext'
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { toast } from 'react-toastify'
import axios from 'axios'

export default function PaymentForm() {
  const router = useRouter()
  const { user } = useContext(AuthContext)
  const { cartItems, getCartTotal, clearCart } = useContext(CartContext)
  const [isProcessingPayment, setIsProcessingPayment] = useState(false)

  const stripe = useStripe()
  const elements = useElements()
  const amount = getCartTotal()

  async function paymentHandler(e) {
    e.preventDefault()
    if (!stripe || !elements) {
      return
    }
    if (!user._id) {
      router.push('/sign-in')
      toast.info('You must be logged in to make a payment.')
      return
    }
    try {
      setIsProcessingPayment(true)
      const response = await fetch('/api/stripe/create-payment-intent', {
        method: 'POST',
        body: JSON.stringify({
          amount: amount * 100,
        }),
      })
      const data = await response.json()
      // console.log('data: >>>>>>>>>', data)
      const clientSecret = data.client_secret
      const { paymentIntent, error } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: user?.username || 'guest',
          },
        },
      })
      // console.log('paymentIntent: >>>>>>>>>', paymentIntent)
      if (error) {
        throw new Error(error.message)
      } else if (paymentIntent.status === 'succeeded') {
        toast.success('Payment Successful!')

        // Create an order in the database
        const orderResponse = await axios.post('/api/orders/create-order', {
          user: user._id,
          items: cartItems,
          total: amount,
        })
        if (orderResponse.status === 201) {
          toast.success('Order placed successfully!')
        } else {
          throw new Error('There was an error processing your order. Please try again.')
        }

        clearCart()
        router.push('/')
      }
    } catch (error) {
      console.log('error: >>>>>>>>>', error)
      toast.error(error.message)
    } finally {
      setIsProcessingPayment(false)
    }
  }

  return (
    <div className='payment-form-container flex justify-end mt-8 w-full'>
      <form className='payment-form min-w-[500px]' onSubmit={paymentHandler}>
        <h2 className='font-medium text-xl'>
          Credit Card Payment:
        </h2>
        <div className='my-6'>
          <CardElement />
        </div>
        <button
          type='submit'
          className={`
          bg-black hover:bg-gray-800 text-white py-2 px-4 rounded 
            ${isProcessingPayment && 'opacity-50 cursor-not-allowed'}
          `}
          disabled={isProcessingPayment}
        >
          {isProcessingPayment ? 'Processing...' : 'Pay Now'}
        </button>
      </form>
    </div>
  )
}
