import sveltePreprocess from 'svelte-preprocess';

export default sveltePreprocess({
  postcss: {
    plugins: [require('autoprefixer')],
  },
  scss: {
    includePaths: ['src'],
  },
});
