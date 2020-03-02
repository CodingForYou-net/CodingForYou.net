import 'colors';

import * as sapper from '@sapper/server';
import clear from 'clear';
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
    console.log('MongoDB connected');
  })
  .catch((err) => {
    console.log('error', err);
  });

express()
  .use(compression({ threshold: 0 }), sirv('static', { dev }), sapper.middleware())
  .listen(PORT, (err) => {
    if (err) console.log('error', err);
    console.log(`server running on port ${PORT}`);
  });
