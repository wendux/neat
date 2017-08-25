/**
 * Created by du on 16/9/24.
 */
var fs = require("fs");
var webpack = require('webpack');
module.exports = {
    devtool:'#source-map',
    entry: {
        neat: "./src/neat.js",
    },
    output: {
        path: "./npm/dist",
        filename: "[name].js",
        //umd放开
         libraryTarget: "umd",
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
        // new webpack.optimize.UglifyJsPlugin({
        //     sourceMap: true,
        //     compress: {
        //         warnings: true
        //     }
        // }),
    ]
}


