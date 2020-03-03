import 'colors';

import * as sapper from '@sapper/server';
import compression from 'compression';
import express from 'express';
import mongoose from 'mongoose';
import sirv from 'sirv';

import { mongoURI } from './config/keys';

const { PORT, NODE_ENV } = process.env;
const dev = NODE_ENV === 'development';

mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('✔ mongodb connected'.green.bold);
  })
  .catch((err) => {
    console.log('✖ error'.red.bold, `${err}`.red);
  });

express()
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
  .listen(PORT, (err) => {
    if (err) console.log('✖ error'.red.bold, `${err}`.red);
    console.log(`✔ server running on port ${PORT}`.green.bold);
  });
