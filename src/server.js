import 'colors';

import configurePassport from '@config/passport';
import { connect as connectToMongoose } from '@helpers/mongoose';
import { start as startServer } from '@helpers/server';
import passport from 'passport';

const { NODE_ENV } = process.env;
const dev = NODE_ENV === 'development';

// NOTE Passport configuration
configurePassport(passport);

if (dev) {
  // NOTE Connection to MongoDB
  connectToMongoose();
  // NOTE Start server
  startServer();
} else {
  // NOTE Connection to MongoDB
  connectToMongoose().then(() => /* NOTE Start server */ startServer());
}
