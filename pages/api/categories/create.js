import Category from '@/models/category'
import { connectToDb } from '@/utils/db'

export default async function handler(req, res) {
  try {
    await connectToDb()
    const { title, imageUrl } = req.body
    const category = new Category({ title, imageUrl })
    await category.save()
    res.status(200).json({ message: 'Category created successfully', category })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
