var webpack = require("webpack"),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: {
        app: "./src/app.js",
        vendor: ['jquery', 'backbone']
    },
    output: {
        path: 'dist',
        filename: "[name].[chunkhash].js",
        publicPath: "/dist/",
        chunkFilename: '[name].[chunkhash].js'
    },
    module: {
        noParse: ['jquery'],
        loaders: [{
            test: /\.css$/,
            loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
        }, {
            test: /\.(jpe?g|png|gif)$/i,
            loaders: ['url?limit=10000&name=image/[hash:8].[name].[ext]']
        }]
    },
    plugins: [
        // //生成vendor chunk，抽取第三方模块单独打包成独立的chunk
        // new webpack.optimize.CommonsChunkPlugin("vendor", "vendor.[hash].js"),
        // //抽取webpack loader公共部分的代码到manifest.js中，避免每次打包时hash发生变化
        new webpack.optimize.CommonsChunkPlugin({
            names: ["vendor", "manifest"]
        }),
        new HtmlWebpackPlugin({
            template: './template/index.html',
            filename: '../index.html', //生成的html存放路径，相对于 path
            inject: true, //允许插件修改哪些内容，包括head与body
            minify: { //压缩HTML文件
                // removeComments: true, //移除HTML中的注释
                // collapseWhitespace: true //删除空白符与换行符
            }
        }),
        // //暴露全局接口到模块中，注意：并非暴露到window下，仅仅是模块内部不需要再写require这些模块，就可以使用这些模块的别名
        // new webpack.ProvidePlugin({
        //     $: 'jquery',
        //     jQuery: 'jquery',
        //     Backbone: 'backbone',
        //     _: 'underscore'
        // }),
        // //根据html模板生成对应的jsp文件
        // // new HtmlWebpackPlugin({
        // //  template: './jsp/cpcadindex.html',
        // //  filename: '../jsp/cpcadindex.jsp'
        // // }),
        // //把css模块提取到独立的css文件中，在head标签引用
        new ExtractTextPlugin('[name].[hash].css')
    ],
    devtool: "source-map"
}