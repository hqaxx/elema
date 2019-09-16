//这个文件作为入口文件
require('babel-register') ({
    presets: [ 'env' ]
})

module.exports = require('./server.js')