const webpack = require('webpack');
const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
    devtool: 'inline-source-map',
    devServer: {
        contentBase: path.join(__dirname, "dist"),
        compress: true,
        open: true,
        host:"0.0.0.0",
        useLocalIp: true,
        headers: {
            "Author": "Lucien-X"
        },
        noInfo: true,
        clientLogLevel: "none",
        overlay: {
            warnings: true,
            errors: true
        }
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('development')
            }
        })
    ]
});