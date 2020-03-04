import { get as googleCallback } from '@routes/auth/google/callback.js';
import * as sapper from '@sapper/server';
import compression from 'compression';
import express from 'express';
import session from 'express-session';
import passport from 'passport';
import sirv from 'sirv';

const { PORT, NODE_ENV } = process.env;
const dev = NODE_ENV === 'development';

export function start() {
  express()
    // NOTE Passport middlewares
    .use(
      session({
        secret: 'OYU4AUcAJMUyxB7x4bii',
        resave: false,
        saveUninitialized: false,
        cookie: { secure: !dev },
      }),
      passport.initialize(),
      passport.session(),
    )
    // NOTE Caveat: incompatibility between Sapper and Passport
    .get('/auth/google/callback', googleCallback)
    // NOTE Sapper middlewares
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
}
