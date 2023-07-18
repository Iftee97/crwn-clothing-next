import User from '@/models/user'
import { connectToDb } from '@/utils/db'

// get all users (user must be authenticated and admin only)
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
    const users = await User.find({})
    res.status(200).json(users)
  } catch (error) {
    res.status(404).json({ message: 'Error: users not found' })
  }
}
