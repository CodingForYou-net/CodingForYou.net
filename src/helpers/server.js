import { get as googleCallback } from '@routes/api/auth/google/callback.js';
import * as sapper from '@sapper/server';
import bodyParser from 'body-parser';
import compression from 'compression';
import express from 'express';
import session from 'express-session';
import MemoryStoreFactory from 'memorystore';
import passport from 'passport';
import sirv from 'sirv';

const { PORT, NODE_ENV } = process.env;
const dev = NODE_ENV === 'development';

const MemoryStore = MemoryStoreFactory(session);

export function start() {
  express()
    // NOTE Passport middlewares
    .use(
      session({
        secret: 'OYU4AUcAJMUyxB7x4bii',
        resave: false,
        saveUninitialized: false,
        cookie: { secure: !dev },
        store: new MemoryStore({ checkPeriod: 86400000 }),
        cookie: { maxAge: 86400000 },
      }),
      passport.initialize(),
      passport.session()
    )
    // NOTE Caveat: incompatibility between Sapper & Passport
    .get('/auth/google/callback', googleCallback)
    // NOTE Sapper middlewares
    .use(
      bodyParser.json({
        verify: function(req, res, buf) {
          req.rawBody = buf.toString();
        },
      }),
      compression({ threshold: 0 }),
      sirv('static', { dev }),
      sapper.middleware({
        session: (req) => {
          const lang = (req.headers['accept-language'] || '')
            .split(';')[0]
            .split(',')
            .map((l) => l.split('-')[0])
            .filter((l) => ['fr', 'en'].includes(l))[0];
          const isLoggedIn = !!req.user;
          const isAdmin = !!(req.user || {}).admin;
          const { image, firstName, lastName, id, email } = req.user || {};
          const user = { image, firstName, lastName, id, email };
          return { lang, isLoggedIn, isAdmin, user };
        },
      })
    )
    // NOTE Start server
    .listen(PORT, (err) => {
      if (err) console.log('✖ error'.red.bold, `${err}`.red);
      console.log(`✔ server running on port ${PORT}`.green.bold);
    });
}
