import Order from '@/models/order'
import { connectToDb } from '@/utils/db'

export default async function handler(req, res) {
  try {
    await connectToDb()
    const { id } = req.query
    await Order.findByIdAndDelete(id)
    res.status(200).json({ message: 'Order deleted successfully' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Error: could not delete order' })
  }
}
