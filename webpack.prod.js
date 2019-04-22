const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const EncodingPlugin = require('webpack-encoding-plugin');

module.exports = merge(common, {
  mode: 'production',
});