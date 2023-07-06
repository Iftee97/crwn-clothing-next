import User from '@/models/user'
import { connectToDb } from '@/utils/db'

export default async function handler(req, res) {
  try {
    await connectToDb()
    const users = await User.find({})
    res.status(200).json(users)
  } catch (error) {
    res.status(404).json({ message: 'Error: users not found' })
  }
}
