const webpack = require("webpack");
const path = require('path');

module.exports = {
    entry: './src/main.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: require.resolve('./src/app.js'),
                use: [
                    { loader: 'expose-loader', options: 'App' },
                ]
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: 'babel-loader',
            },
        ]
    },
};
