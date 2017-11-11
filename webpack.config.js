const path = require('path')
const webpack = require('webpack')

module.exports = {
  entry: "./src",

  output: {
    path: path.resolve(__dirname, 'build-profile'),
    filename: "bundle.js",
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': `"development"`,
    }),
  ],

  devtool: 'source-map',

  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css?$/,
        loaders: ['style-loader', 'css-loader'],
      }
    ]
  }
}
