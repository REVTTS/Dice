const nodeExternals = require('webpack-node-externals');
const path = require('path');

module.exports = {
  devtool: "inline-cheap-module-source-map",
  externals: [nodeExternals()],
  output: {
    devtoolModuleFilenameTemplate: '[absolute-resource-path]',
    devtoolFallbackModuleFilenameTemplate: '[absolute-resource-path]?[hash]'
  },
  mode: 'development',
  resolve: {
    alias: {
      'src': path.resolve(__dirname, 'src'),
    },
  },
  target: 'node'
};