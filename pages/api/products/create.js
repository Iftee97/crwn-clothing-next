import Product from '@/models/product'
import { connectToDb } from '@/utils/db'

export default async function handler(req, res) {
  try {
    await connectToDb()
    const { title, price, description, imageUrl, category } = req.body
    const product = new Product({ title, price, description, imageUrl, category })
    await product.save()
    res.status(200).json({ message: 'Product created successfully', product })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
