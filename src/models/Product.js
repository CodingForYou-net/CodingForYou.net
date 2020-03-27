import { Schema, model } from 'mongoose';

const OrderSchema = new Schema({
  name: {
    fr: {
      type: String,
      required: true,
    },
    en: {
      type: String,
      required: true,
    },
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
    fr: {
      type: String,
      required: true,
    },
    en: {
      type: String,
      required: true,
    },
  },
  features: {
    type: [
      {
        fr: {
          type: String,
          required: true,
        },
        en: {
          type: String,
          required: true,
        },
      },
    ],
    required: true,
    minlength: 0,
  },
  quantity: {
    type: Number,
    default: 1,
  },
  archived: {
    type: Boolean,
    default: false,
  },
});

model('Product', OrderSchema, 'products');
