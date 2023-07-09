import { Schema, model, models } from 'mongoose'

const CategorySchema = new Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
  },
  imageUrl: {
    type: String,
  },
  items: {
    type: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
    default: [],
    required: [true, 'Items is required'],
  },
})

const Category = models?.Category || model('Category', CategorySchema)

export default Category
