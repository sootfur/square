const { merge } = require('webpack-merge');

const webpackConfig = process.env.NODE_ENV === 'production'
    ? require('./webpack/webpack.config.prod')
    : require('./webpack/webpack.config.dev');

module.exports = merge(require('./webpack/webpack.config.base'), webpackConfig);