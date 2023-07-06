import User from '@/models/user'
import { connectToDb } from '@/utils/db'
import { generateToken } from '@/utils/generateToken'
import bcrypt from 'bcryptjs'

export default async function handler(req, res) {
  try {
    await connectToDb() // connect to database first because api route handlers are serverless functions
    const { username, phone, password } = req.body

    const userExists = await User.findOne({ phone })
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' })
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const user = await User.create({
      username,
      phone,
      password: hashedPassword,
    })
    console.log('user: >>>>>>>>', user)
    if (user) {
      const token = generateToken(user._id)
      console.log('register token: >>>>>>>>', token)
      return res.status(201).json({
        message: 'User created successfully',
        _id: user._id,
        username: user.username,
        phone: user.phone,
        token,
      })
    } else {
      return res.status(400).json({ message: 'Invalid user data' })
    }
  } catch (error) {
    return res.status(500).json({ message: 'Error: Could not create user' })
  }
}
