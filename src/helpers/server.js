import { dev } from '@helpers/other.js';
import * as sapper from '@sapper/server';
import bodyParser from 'body-parser';
import compression from 'compression';
import express from 'express';
import session from 'express-session';
import MemoryStoreFactory from 'memorystore';
import passport from 'passport';
import sirv from 'sirv';

const { PORT } = process.env;

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
    // NOTE Sapper middlewares
    .use(
      bodyParser.json({
        verify: function(req, res, buf) {
          req.rawBody = buf.toString();
        },
      }),
      bodyParser.raw(),
      bodyParser.text(),
      compression({ threshold: 0 }),
      sirv('static', { dev }),
      sapper.middleware({
        session: (req) => {
          const browserLang = (req.headers['accept-language'] || '')
            .split(';')[0]
            .split(',')
            .map((l) => l.split('-')[0])
            .filter((l) => ['fr', 'en'].includes(l))[0];
          return { browserLang };
        },
      })
    )
    // NOTE Start server
    .listen(PORT, (err) => {
      if (err) console.log('✖ error'.red.bold, `${err}`.red);
      console.log(`✔ server running on port ${PORT}`.green.bold);
    });
}
