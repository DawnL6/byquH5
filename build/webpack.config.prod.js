const path = require('path');
const webpack = require("webpack");
const merge = require("webpack-merge");
const cleanWebpackPlugin = require("clean-webpack-plugin");
const ExtractPlugin = require('extract-text-webpack-plugin')
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const webpackConfigBase = require('./webpack.config.base');

module.exports = merge(webpackConfigBase, {
  mode: 'production', // 通过 mode 声明生产环境
  output: {
    filename: 'pages/[name].[chunkhash:8].js',
  },
  resolve: {
    alias: {
      vue: 'vue/dist/vue.min.js'
    }
  },
  module: {
    rules: [
      {
        test: /\.css/,
        use: ExtractPlugin.extract({
          fallback: 'vue-style-loader',
          use: [
            'css-loader',
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: true
              }
            }
          ],
          publicPath: "../../"
        })
      },
      {
        test: /\.less/,
        use: ExtractPlugin.extract({
          fallback: 'vue-style-loader',
          use: [
            'css-loader',
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: true
              }
            },
            'less-loader'
          ],
          publicPath: "../../"
        })
      }
    ]
  },
  plugins: [
    //删除dist目录
    new cleanWebpackPlugin(['dist'], {
      root: path.resolve(__dirname, '../'),
      verbose: true,
      dry: false,
    }),
    new ExtractPlugin('static/css/pages/[name].[hash:8].min.css'),
    new OptimizeCSSPlugin({
      cssProcessorOptions: {
        safe: true
      }
    }),
    new UglifyJSPlugin({
      uglifyOptions: {
        compress: {
          warnings: false,
          drop_debugger: false,
          drop_console: true
        }
      }
    })
  ]
})
