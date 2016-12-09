/**
 * Created by du on 16/9/24.
 */
var path = require('path');
var fs = require("fs");
var webpack = require('webpack');
module.exports = {
    entry: {
        neat: "./src/neat.js",
        "neat.plugin.util":"./src/extend/neat.plugin.util.js",
        test:["./examples/test.js"]
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
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: true
            }
        }),
    ]
}


