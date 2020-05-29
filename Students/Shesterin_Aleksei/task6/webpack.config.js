let HtmlWebpackPlugin = require('html-webpack-plugin');
let MiniCssExtractPlugin = require('mini-css-extract-plugin');
let VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/public/shop.html"
        }),
        new MiniCssExtractPlugin(),
        new VueLoaderPlugin(),
    ],
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: [MiniCssExtractPlugin.loader, 'css-loader'],
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node-modules/
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                exclude: /node-modules/
            }
        ],
    },
}
