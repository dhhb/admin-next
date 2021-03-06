'use strict';

const path = require('path');
const webpack = require('webpack');
const HtmlPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const cssnext = require('postcss-cssnext');
const postcssImport = require('postcss-import');
const config = require('c0nfig');

const isProduction = (config.env === 'production');

let plugins = [
  new webpack.DefinePlugin({
    'process.env': {
      'NODE_ENV': JSON.stringify(config.env),
      'API_URL': JSON.stringify(config.api.url),
      'API_SHARED_KEY': JSON.stringify(config.api.sharedKey),
      'AUTH_COOKIE_NAME': JSON.stringify(config.auth.cookieName)
    }
  }),
  new HtmlPlugin({
    title: 'r-o-b admin panel',
    template: 'templates/base.ejs',
    hash: true
  })
];

// extend plugins list for production
if (isProduction) {
  plugins = plugins.concat([
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: { warnings: false },
      output: { comments: false }
    }),
    new webpack.NoErrorsPlugin()
  ]);
}

// extract css into bundle file
plugins.push(
  new ExtractTextPlugin(getFilename('css'))
);

module.exports = {
  devtool: 'eval',

  entry: './src/index.js',

  output: {
    path: path.join(__dirname, './public'),
    filename: getFilename('js'),
    publicPath: '/'
  },

  plugins: plugins,

  resolve: {
    extensions: ['', '.js', '.jsx', '.json', '.vue'],
    alias: {
      vue: 'vue/dist/vue.js'
    }
  },

  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel'
    }, {
      test: /\.css$/,
      loader: ExtractTextPlugin.extract('style-loader', 'css!postcss')
    },{
      test: /\.scss$/,
      loader: ExtractTextPlugin.extract('style-loader', 'css!sass')
    },{
      test: /\.(eot|svg|ttf|woff|woff2)(\?\S*)?$/,
      loader: 'file-loader'
    },{
      test: /\.(png|jpe?g|gif|svg)(\?\S*)?$/,
      loader: 'file-loader',
      query: {
        name: '[name].[ext]?[hash]'
      }
    },{
      test: /\.vue$/,
      loaders: ['vue']
    }]
  },

  vue: {
    loaders: {
      js: 'babel'
    }
  },

  postcss: function () {
    return [postcssImport, cssnext];
  }
};

function getFilename (ext) {
  return isProduction ? `bundle.min.${ext}` : `bundle.${ext}`;
}
