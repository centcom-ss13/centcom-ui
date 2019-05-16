const path = require('path');
const fs = require('fs');
const lessToJs = require('less-vars-to-js');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const themeVariables = lessToJs(fs.readFileSync(path.join(__dirname, './ant-theme-vars.less'), 'utf8'))

const scssLoader = [
  { loader: 'style-loader' },
  { loader: 'css-loader' },
  { loader: 'sass-loader' }
];

module.exports = {
  entry: './src/index.js',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [{
          loader: 'babel-loader',
          options: {
            plugins: [
              ["import", { "libraryName": "antd", "libraryDirectory": "es", "style": true }],
            ],
          },
        }],
      },
      {
        test: /\.(scss|sass)$/,
        loader: scssLoader,
        include: [__dirname]
      },
      {
        test: /\.css$/,
        use: [
          { loader: 'style-loader' },
          {
            loader: 'css-loader',
            options: {
              modules: true, // default is false
              sourceMap: true,
              importLoaders: 1,
              localIdentName: "[name]--[local]--[hash:base64:8]"
            }
          },
          {
            loader: 'babel-loader',
            options: {
              plugins: [
                ['import', { libraryName: "antd", libraryDirectory: "es", style: "css" }]
              ]
            },
          },
        ],
        include: [__dirname]
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              plugins: [
                ['import', { libraryName: "antd", libraryDirectory: "es", style: true }],
                '@babel/plugin-proposal-class-properties'
              ]
            },
          },
          {loader: "style-loader"},
          {loader: "css-loader"},
          {loader: "less-loader",
            options: {
              modifyVars: themeVariables,
              javascriptEnabled: true,
            }
          },
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx', '.css', '.scss', '.sass', '.json'],
    modules: [
      path.resolve(__dirname, 'node_modules'),
      path.resolve(__dirname, './src'),
    ]
  },
  output: {
    path: __dirname + '/dist',
    publicPath: '/',
    filename: 'bundle.js'
  },
  plugins: [
    new CopyWebpackPlugin([{
      from: './public',
      to: '.',
    }]),
  ]
};
