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
  price: {
    type: Number,
    required: true,
  },
  currency: {
    type: String,
    required: true,
  },
});

model('Product', OrderSchema, 'products');
