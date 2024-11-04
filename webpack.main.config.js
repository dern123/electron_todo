const path = require('path');

module.exports = {
  /**
   * This is the main entry point for your application, it's the first file
   * that runs in the main process.
   */
  entry: './src/main.js',
  // output: {
  //   filename: 'bundle.js',
  //   path: path.resolve(__dirname, 'dist'),
  // },
  resolve: {
    extensions: ['.js', '.ts', '.tsx', '.json'],
    fallback: {
      fs: false, // оскільки fs не потрібен у renderer процесі
      path: require.resolve('path-browserify'), // підстановка для path
    },
  },
  // Put your normal webpack config below here
  module: {
    rules: require('./webpack.rules'),
  },
};
