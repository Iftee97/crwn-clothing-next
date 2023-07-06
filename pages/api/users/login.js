import User from '@/models/user'
import { connectToDb } from '@/utils/db'
import { generateToken } from '@/utils/generateToken'
import bcrypt from 'bcryptjs'

export default async function handler(req, res) {
  try {
    await connectToDb()
    const { phone, password } = req.body

    const user = await User.findOne({ phone })
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' })
    }

    const token = generateToken(user._id)
    console.log('login token: >>>>>>>>', token)
    return res.status(200).json({
      message: 'User logged in successfully',
      _id: user._id,
      username: user.username,
      phone: user.phone,
      token,
    })
  } catch (error) {
    return res.status(500).json({ message: 'Error: Could not log in user' })
  }
}
