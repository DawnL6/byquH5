const path = require('path');
const webpack = require("webpack");
const merge = require("webpack-merge");
const webpackConfigBase = require('./webpack.config.base');


module.exports = merge(webpackConfigBase, {
  mode: 'development', // 通过 mode 声明开发环境,
  output: {
    publicPath: '/',
  },
  devtool: "source-map",
  devServer: {
    contentBase: path.resolve(__dirname, './src'),
    overlay: {
      errors: true
    },
    host: "0.0.0.0",
    port: "8889",
    watchOptions: {
      watchContentBase: true,
      redirect: false,
      watch: true,
      poll: 1000,
      aggregateTimeout: 300 // 默认值
    },
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true
            }
          }
        ]
      },
      {
        test: /\.less$/,
        use: [
          'vue-style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true
            }
          },
          'less-loader'
        ]
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ],
  resolve: {
    alias: {
      vue: 'vue/dist/vue.js'
    }
  }
})
