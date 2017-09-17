const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    entry: {
        main: './src/main.js',
        vendor: [
            'jquery',
            'lodash',
            'highlight.js',
            'socket.io-client'
        ]
    },
    plugins: [
        new ExtractTextPlugin("[name].[contenthash:8].css"),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'src/index.ejs',
            xhtml: true,
            minify: {
                // removeComments:true,
                // maxLineLength:150,
                caseSensitive: true,
                collapseWhitespace: true,
                collapseInlineTagWhitespace: true,
                keepClosingSlash: true,
                sortAttributes: true,
                sortClassName: true,
                removeScriptTypeAttributes: true,
                removeStyleLinkTypeAttributes: true,
            }
        }),
        new webpack.NamedModulesPlugin(),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor'
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'runtime'
        }),
    ],
    output: {
        filename: '[name].[chunkhash:8].js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [{
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env']
                    }
                }
            }, {
                test: /\.styl$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: [
                        'css-loader',
                        'stylus-loader'
                    ]
                })
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader"
                })
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        context: '/',
                        name: '[name].[hash:8].[ext]'
                    }
                }],
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        context: '/',
                        name: '[name].[hash:8].[ext]'
                    }
                }]
            },
            {
                test: /\.(csv|tsv)$/,
                use: [
                    'csv-loader'
                ]
            },
            {
                test: /\.xml$/,
                use: [
                    'xml-loader'
                ]
            }
        ]
    }
};