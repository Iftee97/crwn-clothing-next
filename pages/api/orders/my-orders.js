import Order from '@/models/order'
import { connectToDb } from '@/utils/db'

export default async function handler(req, res) {
  try {
    await connectToDb()
    const { user } = req.body

    if (!user) {
      res.status(400)
      throw new Error('No user')
    }

    const orders = await Order.find({ user })
    res.status(200).json(orders)
  } catch (error) {
    res.status(404).json({ message: 'Error: could not get orders' })
  }
}
