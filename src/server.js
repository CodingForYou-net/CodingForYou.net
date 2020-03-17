import 'colors';

import configurePassport from '@config/passport.js';
import { connect as connectToMongoose } from '@helpers/mongoose.js';
import { sendMail } from '@helpers/nodemailer.js';
import { start as startServer } from '@helpers/server.js';
import passport from 'passport';

(async function() {
  // NOTE Connection to MongoDB
  await connectToMongoose();
  // NOTE Passport configuration
  configurePassport(passport);
  // NOTE Start server
  startServer();
  await sendMail(
    'sales',
    'Ventes CodingForYou <sales@codingforyou.net>',
    ['samumartineau@gmail.com', 'cvdkhoa@gmail.com'],
    'test',
    '<b>this is bold</b>'
  );
})();
