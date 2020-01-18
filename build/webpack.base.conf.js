
/*
 * @Description: webpack基础配置
 * @Author: dingxuejin
 * @Date: 2020-01-02 09:39:04
 * @LastEditTime : 2020-01-18 11:25:16
 * @LastEditors  : dingxuejin
 */
const path = require('path');
const config = require('../config')
const utils = require('./utils')

module.exports={
      context: path.resolve(__dirname, '../client'),
      entry:"./src/index.js",
      output: {
        path: path.join(__dirname, '/client/dist'),
        filename: '[name].js',
        publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
      },
      //配置模块如何解析
      resolve: {
        alias:{
          '@':path.join(__dirname,'../client/src')
        },
        //自动解析确定的扩展
        extensions: ['.js', '.jsx', '.json']
      },
      module: {
        rules: [
          //解析js,jsx
          {
            test: /\.(js|jsx)$/,
            loader: 'babel-loader',
            exclude:/node_modules/
          },
          //解析图片文件
          {
            test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
            loader: 'url-loader',
            options: {
              limit: 10000,
              name: utils.assetsPath('img/[name].[hash:7].[ext]')
            }
          },
          //解析音频文件
          {
            test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
            loader: 'url-loader',
            options: {
              limit: 10000,
              name: utils.assetsPath('media/[name].[hash:7].[ext]')
            }
          },
          //解析字体文件
          {
            test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
            loader: 'url-loader',
            options: {
              limit: 10000,
              name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
            }
          }
        ]
      },
}