import sveltePreprocess from 'svelte-preprocess';

export default sveltePreprocess({
  postcss: {
    plugins: [
      require('autoprefixer'),
      require('cssnano')({
        preset: 'default',
      }),
    ],
  },
  scss: {
    includePaths: ['src'],
  },
});
