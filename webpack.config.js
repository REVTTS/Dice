const path = require('path');

module.exports = (env) => {
  return {
    entry: './src/index.js',
    mode: env.production ? 'production' : 'development',
    output: {
      clean: true,
      filename: 'index.js',
      path: path.resolve(__dirname, 'dist'),
    },
    module: {
      rules: [
        {
          test: /test\.js$/,
          use: 'mocha-loader',
          exclude: /node_modules/,
        },
      ],
    },
  };
};