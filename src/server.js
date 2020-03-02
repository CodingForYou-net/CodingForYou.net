import 'colors';

import * as sapper from '@sapper/server';
import compression from 'compression';
import express from 'express';
import mongoose from 'mongoose';
import sirv from 'sirv';

const { PORT, NODE_ENV } = process.env;
const dev = NODE_ENV === 'development';

mongoose
  .connect('mongodb://localhost/codingforyou-dev', {
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
  .use(compression({ threshold: 0 }), sirv('static', { dev }), sapper.middleware())
  .listen(PORT, (err) => {
    if (err) console.log('✖ error'.red.bold, `${err}`.red);
    console.log(`✔ server running on port ${PORT}`.green.bold);
  });
