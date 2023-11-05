import { Schema, model, models } from 'mongoose'

const UserSchema = new Schema({
  username: {
    type: String,
    required: [true, 'Username is required'],
  },
  email: {
    type: String,
    unique: [true, 'Email already exists'],
    required: [true, 'Email is required'],
    validate: {
      validator: (value) => {
        return /\S+@\S+\.\S+/.test(value)
      },
      message: 'Not a valid email',
    },
  },
  password: {
    type: String,
    minlength: [6, 'Password must be at least 6 characters'],
    required: [true, 'Password is required'],
  },
  isAdmin: {
    type: Boolean,
    default: false,
  }
}, {
  timestamps: true,
})

const User = models?.User || model('User', UserSchema)

export default User
