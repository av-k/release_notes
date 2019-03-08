const webpack = require('webpack');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const common = require('./webpack.common.js');
const config = require('../bin');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    contentBase: './public',
    historyApiFallback: true,
    hot: true,
    host: config.HOST,
    port: config.PORT
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: 'public/template.html',
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ]
});
