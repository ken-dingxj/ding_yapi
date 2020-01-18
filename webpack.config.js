/*
 * @Description: 
 * @Author: dingxuejin
 * @Date: 2020-01-02 09:39:04
 * @LastEditTime : 2020-01-13 22:53:40
 * @LastEditors  : dingxuejin
 */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack');


module.exports={
      context: path.resolve(__dirname, '../'),
      entry:"./client/src/index.js",
      output: {
        path: path.join(__dirname, '/client/dist'),
        filename: 'bundle.js'
      },
      resolve: {
        alias:{
          '@':path.resolve(__dirname, 'client/src')
        },
        extensions: ['.js', '.jsx', '.json']
      },
      devServer:{
        contentBase: false,
        hot: true,
        open: true,
        port: 9000,
        compress: true,
      },
      //devtool:"source-map",
      module: {
        rules: [
          {
            test: /\.(js|jsx)$/,
            loader: 'babel-loader',
            exclude: /node_modules/,
            options: {
              cacheDirectory: true
            }
          },
          {
            test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
            loader: 'url-loader',
            options: {
              limit: 10000,
              // name: utils.assetsPath('img/[name].[hash:7].[ext]')
            }
          },
          {
            test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
            loader: 'url-loader',
            options: {
              limit: 10000,
              // name: utils.assetsPath('media/[name].[hash:7].[ext]')
            }
          },
          {
            test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
            loader: 'url-loader',
            options: {
              limit: 10000,
              // name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
            }
          }
        ]
      },
      plugins:[
        new HtmlWebpackPlugin({
          filename: 'index.html',
          template: path.join(__dirname,"/client/public/index.html"),
          inject: true
        }),
      ]
}