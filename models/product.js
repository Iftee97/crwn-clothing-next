import { Schema, model, models } from 'mongoose'

const ProductSchema = new Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
  },
  image: {
    type: String,
    required: [true, 'Image is required'],
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
  }
})

const Product = models?.Product || model('Product', ProductSchema)

export default Product
