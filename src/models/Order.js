import { Schema, model } from 'mongoose';

const OrderSchema = new Schema({
  product: {
    type: Schema.Types.ObjectId,
    ref: 'Product',
  },
  comments: {
    type: String,
    default: '',
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
    ref: 'User',
  },
});

model('Order', OrderSchema, 'orders');
