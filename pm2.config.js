module.exports = {
  apps: [
    {
      name: 'codingforyou.net',
      script: './__sapper__/build/index.js',
      env: {
        PORT: 1732,
      },
      env_production: {
        PORT: 1732,
      },
    },
  ],
};
