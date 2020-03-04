import 'colors';

import configurePassport from '@config/passport.js';
import { connect as connectToMongoose } from '@helpers/mongoose.js';
import { get } from '@routes/[lang]/auth/google/callback.js';
import * as sapper from '@sapper/server';
import compression from 'compression';
import express from 'express';
import passport from 'passport';
import sirv from 'sirv';

const { PORT, NODE_ENV } = process.env;
const dev = NODE_ENV === 'development';

// NOTE Passport configuration
configurePassport(passport);

// NOTE Connection to MongoDB
connectToMongoose();

express()
  // NOTE Caveat: incompatibility between Sapper and Passport
  .get('/auth/google/callback', ...get)
  // NOTE Middlewares
  .use(
    compression({ threshold: 0 }),
    sirv('static', { dev }),
    sapper.middleware({
      session: (req) => {
        const lang = (req.headers['accept-language'] || '')
          .split(';')[0]
          .split(',')
          .map((l) => l.split('-')[0])
          .filter((l) => ['fr', 'en'].includes(l))[0];
        return { lang };
      },
    }),
  )
  // NOTE Start server
  .listen(PORT, (err) => {
    if (err) console.log('✖ error'.red.bold, `${err}`.red);
    console.log(`✔ server running on port ${PORT}`.green.bold);
  });
