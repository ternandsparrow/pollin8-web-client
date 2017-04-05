'use strict'

var webpack = require('webpack')
var autoprefixer = require('autoprefixer')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var CopyWebpackPlugin = require('copy-webpack-plugin')

var path = require('path')
var APP = path.join(__dirname, '/app')
var CONFIG = path.join(__dirname, '/config/')
var TARGET = path.join(__dirname, '/target')

var argv = require('yargs').argv
var settings = {
  environment: (argv.env) ? argv.env : process.env.NODE_ENV || 'production'
}
settings.config = require(CONFIG + settings.environment)
console.log('Config settings: ' + JSON.stringify(settings))

module.exports = {
  context: APP,
  devtool: 'source-map',
  entry: {
    app: ['./core/bootstrap.js', './index.js'],
    vendor: ['./core/vendor.js']
  },
  output: {
    path: TARGET,
    publicPath: '/',
    filename: '[name].[hash].js',
    chunkFilename: '[name].[hash].js'
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
    new ExtractTextPlugin({ filename: '[name].[hash].css', disable: false }),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.optimize.UglifyJsPlugin(),
    new CopyWebpackPlugin([{
      from: APP
    }]),
    new webpack.LoaderOptionsPlugin({
      options: {
        postcss: [
          autoprefixer({
            browsers: ['last 2 version']
          })
        ]
      }
    })
  ],
  module: {
    rules: [
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract({ fallback: 'style-loader', use: ['css-loader?sourceMap!postcss-loader', 'sass-loader'] })
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader?sourceMap!postcss-loader' })
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)$/,
        loader: 'file-loader'
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
          // other config options to be passed through to standard e.g.
          parser: 'babel-eslint',
          globals: ['angular']
        }
      },
      {
        test: /\.js$/,
        loader: 'ng-annotate-loader?add=true!babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.html$/,
        loader: 'raw-loader',
        exclude: /node_modules/
      }
    ]
  }
}
