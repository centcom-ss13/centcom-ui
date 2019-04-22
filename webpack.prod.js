const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const EncodingPlugin = require('webpack-encoding-plugin');

module.exports = merge(common, {
  mode: 'production',
  plugins: [new EncodingPlugin({
    encoding: 'iso-10646-ucs-2'
  })]
});