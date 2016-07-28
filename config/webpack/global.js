'use strict';

var path         = require('path');
var webpack      = require('webpack');
var TextPlugin   = require('extract-text-webpack-plugin');
var autoprefixer = require('autoprefixer-core');
var HtmlPlugin    = require('html-webpack-plugin');
// var jsonPresent  = require('./helpers/json-presenter');

/**
 * Global webpack config
 * @param  {[type]} _path [description]
 * @return {[type]}       [description]
 */
module.exports = function(_path) {
  var dependencies  = Object.keys(require(_path + '/package').dependencies);
  // var rootAssetPath = './app/assets';

  return {
    entry: {
      application: _path + '/app/assets/javascripts/application.js',
      vendors: dependencies
    },

    output: {
      path: path.join(_path, 'public'),
      filename: 'assets/js/[chunkhash].[name].js',
      chunkFilename: '[chunkhash].[id].js',
      publicPath: '/'
    },

    resolve: {
      extensions: ['', '.js'],
      modulesDirectories: ['node_modules'],
      alias: {
        _javascript: path.join(_path, 'app', 'assets', 'javascripts'),
        _stylesheets: path.join(_path, 'app', 'assets', 'stylesheets'),
        _templates: path.join(_path, 'app', 'assets', 'templates'),
        _images: path.join(_path, 'app', 'assets', 'images')
      }
    },
    module: {
      loaders: [
        { test: /\.js?$/, exclude: /(node_modules|autoprefixer|vendors)/, loader: 'babel',
          query: {
            presets: ['es2015']
          }
        },
        { test: /\.styl$/i, loader: TextPlugin.extract('style', 'css-loader?minimize!postcss!stylus') }
      ]
    },

    stylus: {
      define: {
        $grid_columns: 24,
        $grid_gutter_width: 12,
        $screen_xs: 320,
        $screen_sm: 640,
        $screen_md: 960,
        $screen_lg: 1280
      }
    },

    postcss: [autoprefixer({ browsers: ['last 5 versions'] })],

    plugins: [
      new webpack.optimize.CommonsChunkPlugin('vendors', 'assets/js/[chunkhash].vendors.js'),
      new TextPlugin('assets/css/[chunkhash].[name].css'),
      new HtmlPlugin({
        title: 'Grid Lesson',
        chunks: ['application', 'vendors'],
        filename: 'index.html',
        template: './index.html'
      })
    ]
  };
};
