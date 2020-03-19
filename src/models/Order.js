import { Schema, model } from 'mongoose';

const OrderSchema = new Schema({
  productID: {
    type: String,
    required: true,
  },
  comments: {
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

model('Order', OrderSchema, 'orders');
