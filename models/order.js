import { Schema, model, models } from 'mongoose'

const OrderSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  // shippingAddress: {
  //   type: String,
  //   required: true,
  // },
  items: {
    type: Array,
    required: true,
  },
  total: {
    type: Number,
    required: true,
  },
  isPaid: {
    type: Boolean,
    default: false,
  },
  isDelivered: {
    type: Boolean,
  },
  deliveredAt: {
    type: Date,
  }
}, {
  timestamps: true,
})

const Order = models?.Order || model('Order', OrderSchema)

export default Order
