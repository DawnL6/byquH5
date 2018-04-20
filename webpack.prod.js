const path = require('path');
// const webpack = require('webpack');
const vuxLoader = require('vux-loader');
const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const base = require('./webpack.base');
const webpackBaseConfig = base.config;
const HtmlReplacePlugin = base.HtmlReplacePlugin;
const ROOT_PATH = '/jcapph5/build/';

// 生产环境引入对应的生产环境需要的vue.min.js
webpackBaseConfig.resolve.alias.vue = 'vue/dist/vue.min.js';
webpackBaseConfig.module.rules.push(
	{
		test: /\.(woff|woff2|ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
		loader: 'file-loader?name=[name].[ext]&publicPath=' + ROOT_PATH + '&outputPath=static/fonts/',
		exclude: /(static\/images|pages)/
	},
	{
		test: /\.(png|jpe?g|gif)$/,
		loader: 'url-loader?limit=8196&name=../../static/images/[name].[ext]?[hash]'
	}
)

// 添加生产环境需要的plugin
webpackBaseConfig.plugins.push(
	// 压缩js的插件配置配置
	new ParallelUglifyPlugin({
		cacheDir: '.cache/',
		uglifyJS: {
			output: {
				comments: false
			},
			compress: {
				warnings: false
			}
		}
	}),
	new CleanWebpackPlugin(['build'], {
		root: __dirname,
		verbose: true,
		dry: true
	}),
	// 复制静态文件的webpack插件
	new CopyWebpackPlugin([{
		from: path.resolve(__dirname, 'src/static'),
		to: path.resolve(__dirname, 'build/static')
	}]),
	new HtmlReplacePlugin({
		rules: [
			{
				test: /static(?:\/js\/vender\.js)/,
				value: '../../static/js/vender.js'
			},
			{
				test: /pages(?:\/venders\.css)/,
				value: '../venders.css'
			},
			{
				test: /pages\/\w+\//g,
				value: './'
			}
		]
	})
)
// module.exports = webpackBaseConfig;
module.exports = vuxLoader.merge(webpackBaseConfig, {
	plugins: [
		// css样式优化去重
		{
			name: 'duplicate-style'
		}
	]
});
