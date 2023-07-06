import { Schema, model, models } from 'mongoose'

const CategorySchema = new Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
  },
  items: {
    // type: Array,
    // required: [true, 'Items is required'],
    type: Schema.Types.ObjectId,
    ref: 'Product',
  }
})

const Category = models?.Category || model('Category', CategorySchema)

export default Category
