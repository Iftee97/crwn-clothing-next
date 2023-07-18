import Category from '@/models/category'
import { connectToDb } from '@/utils/db'

export default async function handler(req, res) {
  const { authorization, isadmin } = req.headers
  if (!authorization) {
    res.status(401).json({ message: 'Not Authorized' })
    return
  }
  if (isadmin !== 'true') {
    res.status(401).json({ message: 'Not Authorized as Admin' })
    return
  }

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
