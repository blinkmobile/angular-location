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
  }
}
