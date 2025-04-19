require('dotenv').config();

module.exports = {
    apps: [
      {
        name: 'api-collaborator',
        script: './dist/main.js', 
        watch: true,
        ignore_watch: ['node_modules'],
      },
    ],
  };
  