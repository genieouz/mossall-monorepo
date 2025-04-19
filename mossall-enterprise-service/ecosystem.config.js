require('dotenv').config();

module.exports = {
    apps: [
      {
        name: 'api-enterprise',
        script: './dist/main.js',
        node_args : '-r dotenv/config',
        watch: true,
        ignore_watch: ['node_modules'],
      },
    ],
  };
  