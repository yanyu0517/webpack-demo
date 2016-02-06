//test.js主要用来测试CommonsChunkPlugin的minChunks参数

//new webpack.optimize.CommonsChunkPlugin({
        //     names: 'app',
        //     children: true,
        //     minChunks: 2
        // }),
// 因为CommonsChunkPlugin只会把app下所有chunk公用的部分提取出来
//client和region中都require了common
//而test.js中没有，所以common不会被提到app.js中
//只有minChunks设置了2，说明app下如果有两个chunk公用，就提取到app.js中
//所以common.js的内容会被提取到app.js中
