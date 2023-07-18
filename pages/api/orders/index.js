import Order from '@/models/order'
import { connectToDb } from '@/utils/db'

export default async function handler(req, res) {
  const { authorization, isadmin } = req.headers
  console.log({
    authorization,
    isadmin
  })
  if (!authorization) {
    return res.status(401).json({ error: 'Not Authorized' })
  }
  if (isadmin !== 'true') {
    return res.status(401).json({ error: 'Not authorized as an admin' })
  }

  try {
    await connectToDb()
    const orders = await Order.find({}).populate('user')
    res.status(200).json(orders)
  } catch (error) {
    res.status(404).json({ message: 'Error: could not get orders' })
  }
}
