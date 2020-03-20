import { Schema, model } from 'mongoose';

const OrderSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  images: {
    type: [String],
    required: true,
    minlength: 1,
  },
  amount: {
    type: Number,
    required: true,
  },
  currency: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  features: {
    type: [String],
    required: true,
  },
  quantity: {
    type: Number,
    default: 1,
  },
});

model('Product', OrderSchema, 'products');
