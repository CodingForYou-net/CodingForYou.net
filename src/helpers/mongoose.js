import '@models/User.js';
import '@models/Order.js';

import { mongoURI } from '@config/keys.js';
import mongoose from 'mongoose';

export async function connect() {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✔ mongodb connected'.green.bold);
  } catch (err) {
    console.log('✖ error'.red.bold, `${err}`.red);
  }
}

export const User = mongoose.model('users');
export const Order = mongoose.model('orders');
