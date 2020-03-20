import '@models/User.js';
import '@models/Order.js';
import '@models/Product.js';

import { mongoURI } from '@config/keys.js';
import mongoose from 'mongoose';

export async function connect() {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });
    console.log('✔ mongodb connected'.green.bold);
  } catch (err) {
    console.log('✖ error'.red.bold, `${err}`.red);
  }
}

export const User = mongoose.model('User');
export const Order = mongoose.model('Order');
export const Product = mongoose.model('Product');
