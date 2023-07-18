import Order from '@/models/order'
import { connectToDb } from '@/utils/db'

export default async function handler(req, res) {
  const { authorization, user } = req.headers
  console.log({
    authorization,
    user: JSON.parse(user)
  })
  if (!authorization || !user) {
    return res.status(401).json({ error: 'Not Authorized' })
  }

  try {
    await connectToDb()
    const orders = await Order.find({ user: JSON.parse(user) })
    res.status(200).json(orders)
  } catch (error) {
    res.status(404).json({ message: 'Error: could not get orders' })
  }
}
