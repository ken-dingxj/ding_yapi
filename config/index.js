const path = require('path')

module.exports={
    dev:{
        assetsSubDirectory: 'static',
        assetsPublicPath:'/',
        proxyTable: {
            '/api':'http://localhost:3000'
        },
        host: 'localhost',
        port: 8000,
        autoOpenBrowser: false,
        errorOverlay: true,
        notifyOnErrors: true,
        mode:'development',
        devtool: 'cheap-module-eval-source-map',
        cacheBusting: true,
        cssSourceMap: true,
        poll: false
    },
    build:{
        index: path.resolve(__dirname, '../dist/index.html'),
        mode:'production',
        productionSourceMap: true,
        devtool: '#source-map',
        assetsSubDirectory: 'static',
        assetsPublicPath: '/',
        assetsRoot:path.resolve(__dirname, '../client/dist')
    }
}