const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
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
    new ExtractTextPlugin({
      filename: 'css/styles.css',
      allChunks: true,
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true,
      minify: false,
      chunksSortMode: 'dependency'
    }),
  ],
  devServer: {
    compress: true,
    host: '0.0.0.0',
    port: 3000,
    progress: true,
    disableHostCheck: true
  }
};
