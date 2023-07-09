import Category from '@/models/category'
import Product from '@/models/product'
import { connectToDb } from '@/utils/db'

export default async function handler(req, res) {
  try {
    await connectToDb()
    const categories = await Category.find().populate({
      path: 'items',
      model: 'Product',
    })
    res.status(200).json({ categories })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
