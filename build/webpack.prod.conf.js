/*
 * @Description: webpack开发环境配置
 * @Author: dingxuejin
 * @Date: 2020-01-14 16:01:04
 * @LastEditTime : 2020-01-15 08:48:39
 * @LastEditors  : dingxuejin
 */
const path = require('path')
const utils = require('./utils')
const config = require('../config')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const HtmlWebpackPlugin = require('html-webpack-plugin')

const webpackConfig=merge(baseWebpackConfig,{
    module:{
        rules:utils.styleLoaders({sourceMap: config.build.productionSourceMap,usePostCSS: true})
    },
    mode: config.build.mode,
    devtool: config.build.productionSourceMap ? config.build.devtool : false,
    output:{
        path: config.build.assetsRoot,
        filename: utils.assetsPath('js/[name].[chunkhash].js'),
        chunkFilename: utils.assetsPath('js/[id].[chunkhash].js')
    },
    plugins:[
        // extract css into its own file
        new MiniCssExtractPlugin({
            filename: utils.assetsPath('css/[name].[contenthash].css'),
            chunkFilename: utils.assetsPath('css/[id].css')
        }),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: path.join(__dirname,"../client/public/index.html"),
            inject: true,
            minify: {
              removeComments: true,
              collapseWhitespace: true,
              removeAttributeQuotes: true
              // more options:
              // https://github.com/kangax/html-minifier#options-quick-reference
            },
            // necessary to consistently work with multiple chunks via CommonsChunkPlugin
            chunksSortMode: 'dependency'
          })
    ]
})

module.exports = webpackConfig