const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: ["./front/src/index.js"],
  output: {
    path: __dirname + '/front/dist',
    filename: "bundle.js"
  },
  resolve: {
    extensions: [".js"],
  },
  module: {
    loaders: [
        { test: /\.jsx?$/, loader: 'babel-loader', exclude: /node_modules/, query: {
            cacheDirectory: true,
            presets: ['react', 'es2015']
        }},
        {
          test: /\.css$/,
          loader: ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader?minimize' })
        },
        {
          test: /\.scss$/,
          loader: ExtractTextPlugin.extract({ fallback: "style-loader", use: [
            {loader: "css-loader?minimize"},
            {loader: "sass-loader"}
          ]})
        }
    ]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: {
          warnings: false
      }
    }),
    new ExtractTextPlugin("bundle.css")
  ]
}