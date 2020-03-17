/*
 * @Description: webpack开发配置
 * @Author: dingxuejin
 * @Date: 2020-01-13 22:40:23
 * @LastEditTime: 2020-03-14 01:30:12
 * @LastEditors: dingxuejin
 */
const webpack = require('webpack')
const merge=require('webpack-merge');
const path = require('path');
const portfinder = require('portfinder')
const config=require("../config")
const utils = require('./utils.js');
const baseWebpackConfig = require('./webpack.base.conf');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')


const HOST = process.env.HOST
const PORT = process.env.PORT && Number(process.env.PORT)
const devWebpackConfig=merge(baseWebpackConfig,{
    module:{
        rules:utils.styleLoaders({ sourceMap: true, usePostCSS: false })
    },
    mode: config.dev.mode,
    devtool: config.dev.devtool,
    devServer:{
        clientLogLevel: 'warning',
        historyApiFallback: false,
        contentBase: false,
        hot: true,
        open: config.dev.autoOpenBrowser,
        host: HOST || config.dev.host,
        port: PORT || config.dev.port,
        proxy:config.dev.proxyTable,
        compress: true,
        overlay:config.dev.errorOverlay?{warnings: false, errors: true}:false,
        publicPath:config.dev.assetsPublicPath,
        quiet: true,
        watchOptions: {
            poll: config.dev.poll
        }
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
          filename: 'index.html',
          template: path.join(__dirname,"../client/public/index.html"),
          inject: true
        })
      ]
})

module.exports=new Promise((resolve,reject)=>{
    portfinder.basePort = process.env.PORT || config.dev.port
    portfinder.getPort((err, port) => {
      if (err) {
        reject(err)
      } else {
        // publish the new Port, necessary for e2e tests
        process.env.PORT = port
        // add port to devServer config
        devWebpackConfig.devServer.port = port
  
        // Add FriendlyErrorsPlugin
        devWebpackConfig.plugins.push(new FriendlyErrorsPlugin({
          compilationSuccessInfo: {
            messages: [`Your application is running here: http://${devWebpackConfig.devServer.host}:${port}`]
         },
          onErrors: config.dev.notifyOnErrors
          ? utils.createNotifierCallback()
          : undefined
        }))
  
        resolve(devWebpackConfig)
      }
    })
})