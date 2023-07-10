import Order from '@/models/order'
import { connectToDb } from '@/utils/db'

export default async function handler(req, res) {
  try {
    await connectToDb()
    const { user, items, total } = req.body

    if (items && items.length === 0) {
      res.status(400)
      throw new Error('No order items')
    }

    const order = new Order({
      user,
      items,
      total,
    })
    const createdOrder = await order.save()
    res.status(201).json(createdOrder)
  } catch (error) {
    res.status(404).json({ message: 'Error: could not create order' })
  }
}
