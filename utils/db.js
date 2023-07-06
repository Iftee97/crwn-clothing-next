import mongoose from 'mongoose'

export async function connectToDb() {
  try {
    await mongoose.connect(process.env.MONGO_URI)
    console.log('MongoDB Connected')
  } catch (error) {
    console.error(`Error: ${error.message}`)
    process.exit(1)
  }
}
