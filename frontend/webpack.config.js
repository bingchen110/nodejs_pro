const path = require('path')
var HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
    mode: 'development',

    devtool: 'source-map',

    entry: {
        app: './src/app.js'
    },

    output: {
        path: path.join(__dirname, './dist'),
        filename: 'app.js'
    },

    // 配置插件
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, './public/index.html'),
            filename: 'index.html',
            inject: true
        }),
        new CopyPlugin({
            patterns: [
              { from: "./public/*.ico", to: "./dist/" },
            ],
          })
    ],

    // 配置server
    devServer: {
        contentBase: path.join(__dirname, './dist'),
        compress: true,
        port: 9000
    }
}