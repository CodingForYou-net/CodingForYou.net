import 'colors';

import configurePassport from '@config/passport.js';
import { connect as connectToMongoose } from '@helpers/mongoose.js';
import { start as startServer } from '@helpers/server.js';
import passport from 'passport';

const { NODE_ENV } = process.env;
const dev = NODE_ENV === 'development';

// NOTE Passport configuration
configurePassport(passport);

// NOTE Connection to MongoDB
connectToMongoose();

// NOTE Start server
startServer();

if (dev) {
  connectToMongoose();
  startServer();
} else {
  connectToMongoose().then(() => startServer());
}
