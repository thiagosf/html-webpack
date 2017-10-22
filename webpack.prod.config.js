const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: ['./src/index.js', './sass/styles.sass'],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/index.js',
  },
  module: {
    rules: [{
      test: /\.js$/,
      use: 'babel-loader?presets[]=es2015',
      exclude: /(node_modules|bower_components)/,
    }, {
      test: /\.sass$/,
      loader: ExtractTextPlugin.extract([
        'css-loader?url=false',
        'sass-loader?url=false',
      ])
    }, {
      test: /\.(gif|png|jpg|svg)$/,
      use: ['file-loader']
    }]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      sourceMap: false
    }),
    new ExtractTextPlugin({
      filename: 'css/styles.css',
      allChunks: true,
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true,
      chunksSortMode: 'dependency',
      minify:  {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
      }
    }),
    new OptimizeCSSPlugin({
      cssProcessorOptions: {
        safe: true,
        minify: false,
      }
    }),
    new CopyWebpackPlugin([{
      from: path.resolve(__dirname, 'img'),
      to: path.resolve(__dirname, 'dist/img'),
      ignore: ['.*']
    }, {
      from: path.resolve(__dirname, 'svg'),
      to: path.resolve(__dirname, 'dist/svg'),
      ignore: ['.*']
    }]),
  ],
};
