import { Schema, model } from 'mongoose';

const UserSchema = new Schema({
  googleID: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  image: {
    type: String,
  },
  lang: {
    type: String,
  },
  admin: {
    type: Boolean,
    default: false,
  },
});

model('User', UserSchema, 'users');
