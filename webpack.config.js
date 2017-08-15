/* @flow */
'use strict'

const path = require('path')

module.exports = {
  devtool: 'source-map',
  entry: './lib/index.js',
  externals: {
    angular: 'angular'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bm-location.js'
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /(node_modules|bower_components)/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['es2015', 'env']
        }
      }
    }]
  }
}
