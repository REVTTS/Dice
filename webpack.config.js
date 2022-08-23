const path = require('path');

module.exports = (env) => {
  return {
    entry: './src/index.js',
    mode: (env && env.production) ? 'production' : 'development',
    output: {
      clean: true,
      filename: 'index.js',
      path: path.resolve(__dirname, 'dist'),
    },
  };
};