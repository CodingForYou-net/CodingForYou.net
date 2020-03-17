import { Schema, model } from 'mongoose';

const OrderSchema = new Schema({
  productID: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
  completed: {
    type: Boolean,
    default: false,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users',
  },
});

model('orders', OrderSchema);
