import Product from '@/models/product'
import Category from '@/models/category'
import { connectToDb } from '@/utils/db'

export default async function handler(req, res) {
  try {
    await connectToDb()
    const { title, price, description, imageUrl, category } = req.body

    // Create the product
    const product = new Product({ title, price, description, imageUrl, category })
    await product.save()

    // Update the category's items array
    await Category.findByIdAndUpdate(category, {
      $push: {
        items: product._id
      }
    })

    res.status(200).json({ message: 'Product created successfully', product })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
