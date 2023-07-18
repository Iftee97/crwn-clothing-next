import { Schema, model, models } from 'mongoose'

const UserSchema = new Schema({
  username: {
    type: String,
    required: [true, 'Username is required'],
  },
  phone: {
    type: String,
    unique: [true, 'Phone number already exists'],
    required: [true, 'Phone number is required'],
    length: [10, 'Phone number must be 10 characters'],
    validate: {
      validator: (value) => {
        return value.startsWith('+880')
      },
      message: 'Not a valid Bangladeshi phone number',
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
})

const User = models?.User || model('User', UserSchema)

export default User
