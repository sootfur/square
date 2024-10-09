const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    entry: [
        './source/index.ts',
        './source/styles/style.css',
    ],
    output: {
        path: path.resolve(__dirname, 'dist'),
    },
    module: {
        rules: [
            {
                test: /\.ts?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-typescript'],
                    },
                },
            }
        ]
    },
    resolve: {
        extensions: ['.ts', '.js'],
        alias: {
            '@components': path.resolve(__dirname, '../source/components'),
            '@constants': path.resolve(__dirname, '../source/constants'),
            '@utils': path.resolve(__dirname, '../source/utils'),
            '@styles': path.resolve(__dirname, '../source/styles'),
        },
    },
    plugins: [
        new CleanWebpackPlugin(),
    ],
};
