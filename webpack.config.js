'use strict'

var webpack = require('webpack')
var path = require('path')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var APP = path.join(__dirname, '/app')
var TARGET = path.join(__dirname, '/tmp')
var devServerHost = 'localhost'
var devServerPort = 8080

module.exports = {
  context: APP,
  entry: {
    app: './index.js',
    vendor: './vendor.js'
  },
  output: {
    path: TARGET,
    filename: 'bundle.js'
  },
  devtool: 'source-map',
  devServer: {
    proxy: {
      "/config-module.js": {
        // trap the call to get config so we can override it locally
        target: 'http://localhost:8080',
        pathRewrite: {'.*': 'local-config-module.js'},
        changeOrigin: true
      }
    },
    host: devServerHost,
    port: devServerPort,
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    }),
    new HtmlWebpackPlugin({
      template: './index.html',
      inject: 'body'
    }),
    new webpack.optimize.CommonsChunkPlugin({ name: 'vendor', filename: 'vendor.bundle.js' })
  ],
  module: {
    rules: [
      {
        test: /\.scss$/,
        loader: 'style-loader!css-loader!sass-loader'
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)$/,
        loader: 'file-loader'
      },
      {
        test: /\.ico$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]' // don't hash filename
        }
      },
      {
        // set up standard-loader as a preloader
        enforce: 'pre',
        test: /\.js$/,
        loader: 'standard-loader',
        exclude: /(node_modules|bower_components)/,
        options: {
          // Emit errors instead of warnings (default = false)
          error: false,
          // enable snazzy output (default = true)
          snazzy: true,
          globals: ['angular', 'L']
        }
      },
      {
        test: /\.js$/,
        loader: 'ng-annotate-loader!babel-loader?presets[]=es2015',
        exclude: /node_modules/
      },
      {
        test: /\.html$/,
        loader: 'html-loader',
        exclude: /node_modules/
      }
    ]
  }
}
