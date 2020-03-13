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
});

// NOTE Create collection and add schema
model('users', UserSchema);
