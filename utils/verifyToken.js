import jwt from 'jsonwebtoken'
import User from '@/models/user'

export const verifyToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1]
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    const user = await User.findById(decoded.id)
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }
    req.user = user
    next()
  } catch (error) {
    return res.status(401).json({ message: 'Unauthorized' })
  }
}
