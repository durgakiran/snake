const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            '@babel/preset-env',
                        ],
                        plugins: [
                            ['@babel/transform-runtime'],
                        ],
                    },
                },
            },
            {
                test: /\.css$/i,
                use: [
                    'style-loader',
                    'css-loader',
                    'postcss-loader',
                ],
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
            },
        ],
    },
    entry: {
        index: './src/index.js',
        game: './src/scripts/game.js',
    },
    devtool: 'inline-source-map',
    devServer: {
        static: './dist',
        port: 3000,
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/pages/index.html',
        }),
        new HtmlWebpackPlugin({
            inject: true,
            template: './src/pages/game.html',
            filename: 'game.html',
            chunks: ['game'],
        }),
    ],
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
        clean: true,
    },
};
