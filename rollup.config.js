import alias from '@rollup/plugin-alias';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import babel from 'rollup-plugin-babel';
import copy from 'rollup-plugin-copy';
import del from 'rollup-plugin-delete';
import svelte from 'rollup-plugin-svelte';
import { terser } from 'rollup-plugin-terser';
import config from 'sapper/config/rollup.js';

import pkg from './package.json';

const { preprocess } = require('./svelte.config.js');

const mode = process.env.NODE_ENV;
const dev = mode === 'development';
const legacy = !!process.env.SAPPER_LEGACY_BUILD;

const onwarn = (warning, onwarn) =>
  (warning.code === 'CIRCULAR_DEPENDENCY' && /[/\\]@sapper[/\\]/.test(warning.message)) ||
  onwarn(warning);

export default {
  client: {
    input: config.client.input(),
    output: config.client.output(),
    plugins: [
      replace({
        'process.browser': true,
        'process.env.NODE_ENV': JSON.stringify(mode),
        'process.env.STRIPE_CLI_SIG': `'${process.env.STRIPE_CLI_SIG}'`,
        'process.env.PORT': process.env.PORT,
      }),
      alias({
        entries: [
          { find: /@components\/(.*)\.(.*)/, replacement: __dirname + '/src/components/$1.$2' },
          { find: /@config\/(.*)\.(.*)/, replacement: __dirname + '/src/config/$1.$2' },
          { find: /@helpers\/(.*)\.(.*)/, replacement: __dirname + '/src/helpers/$1.$2' },
          { find: /@models\/(.*)\.(.*)/, replacement: __dirname + '/src/models/$1.$2' },
          { find: /@routes\/(.*)\.(.*)/, replacement: __dirname + '/src/routes/$1.$2' },
          { find: /@src\/(.*)\.(.*)/, replacement: __dirname + '/src/$1.$2' },
        ],
      }),
      svelte({
        dev,
        hydratable: true,
        emitCss: true,
        preprocess,
      }),
      resolve({
        browser: true,
        dedupe: ['svelte'],
      }),
      commonjs(),
      legacy &&
        babel({
          extensions: ['.js', '.mjs', '.html', '.svelte'],
          runtimeHelpers: true,
          exclude: ['node_modules/@babel/**'],
          presets: [
            [
              '@babel/preset-env',
              {
                targets: '> 0.25%, not dead',
              },
            ],
          ],
          plugins: [
            '@babel/plugin-syntax-dynamic-import',
            [
              '@babel/plugin-transform-runtime',
              {
                useESModules: true,
              },
            ],
          ],
        }),

      !dev &&
        terser({
          module: true,
        }),
    ],

    onwarn,
  },
  server: {
    input: config.server.input(),
    output: config.server.output(),
    plugins: [
      replace({
        'process.browser': false,
        'process.env.NODE_ENV': JSON.stringify(mode),
        'process.env.STRIPE_CLI_SIG': `'${process.env.STRIPE_CLI_SIG}'`,
        'process.env.PORT': process.env.PORT,
      }),
      alias({
        entries: [
          { find: /@components\/(.*)\.(.*)/, replacement: __dirname + '/src/components/$1.$2' },
          { find: /@config\/(.*)\.(.*)/, replacement: __dirname + '/src/config/$1.$2' },
          { find: /@helpers\/(.*)\.(.*)/, replacement: __dirname + '/src/helpers/$1.$2' },
          { find: /@models\/(.*)\.(.*)/, replacement: __dirname + '/src/models/$1.$2' },
          { find: /@routes\/(.*)\.(.*)/, replacement: __dirname + '/src/routes/$1.$2' },
          { find: /@src\/(.*)\.(.*)/, replacement: __dirname + '/src/$1.$2' },
        ],
      }),
      svelte({
        generate: 'ssr',
        dev,
        preprocess,
      }),
      resolve({
        dedupe: ['svelte'],
      }),
      commonjs(),
      copy({
        targets: [{ src: 'src/mails/*', dest: config.server.output().dir + '/mails' }],
      }),
      del({ targets: config.server.output().dir + '/mails' }),
    ],
    external: Object.keys(pkg.dependencies).concat(
      require('module').builtinModules || Object.keys(process.binding('natives'))
    ),
    onwarn,
  },
  serviceworker: {
    input: config.serviceworker.input(),
    output: config.serviceworker.output(),
    plugins: [
      resolve(),
      replace({
        'process.browser': true,
        'process.env.NODE_ENV': JSON.stringify(mode),
      }),
      alias({
        entries: [
          { find: /@components\/(.*)\.(.*)/, replacement: __dirname + '/src/components/$1.$2' },
          { find: /@config\/(.*)\.(.*)/, replacement: __dirname + '/src/config/$1.$2' },
          { find: /@helpers\/(.*)\.(.*)/, replacement: __dirname + '/src/helpers/$1.$2' },
          { find: /@models\/(.*)\.(.*)/, replacement: __dirname + '/src/models/$1.$2' },
          { find: /@routes\/(.*)\.(.*)/, replacement: __dirname + '/src/routes/$1.$2' },
          { find: /@src\/(.*)\.(.*)/, replacement: __dirname + '/src/$1.$2' },
        ],
      }),
      commonjs(),
      !dev && terser(),
    ],
    onwarn,
  },
};
