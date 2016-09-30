/**
 * Created by du on 16/9/24.
 */
var path = require('path');
var fs = require("fs");
var webpack = require('webpack');
module.exports = {
    entry: {
        neat: "./src/neat.js",
        "neat.withtouch": "./src/neat.withtouch.js",
        "neat.utils":"./src/extend/neat.plugin.util.js"
    },
    output: {
        path: "./dist",
        filename: "[name].min.js"
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel',
                query: {
                    presets: ['es2015']
                }
            }
        ]
    },
    plugins: [
        //new webpack.optimize.UglifyJsPlugin({
        //    compress: {
        //        warnings: true
        //    }
        //}),
    ]
}