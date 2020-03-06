// import sveltePreprocess from 'svelte-preprocess';

// export default sveltePreprocess({
//   postcss: {
//     plugins: [
//       require('autoprefixer'),
//       require('cssnano')({
//         preset: 'default',
//       }),
//     ],
//   },
// });

const sveltePreprocess = require('svelte-preprocess');
module.exports = {
  preprocess: sveltePreprocess({
    postcss: {
      plugins: [
        require('autoprefixer'),
        require('cssnano')({
          preset: 'default',
        }),
      ],
    },
  }),
};
