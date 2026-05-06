'use strict';
/* global process __dirname */
const MODE = process.env.MODE || 'development';
const enabledSourcemap = (MODE === 'development');
var WebpackBuildNotifierPlugin = require('webpack-build-notifier');

const js = {
	mode: MODE,
	devtool: enabledSourcemap ? 'cheap-module-eval-source-map' : false,
	entry: `${ __dirname }/src/js/main.ts`,
	output: {
		path: `${ __dirname }/public/js/`,
		filename: 'main.js',
		publicPath: `/js/`,
	},
	resolve: {
		extensions: ['.ts', '.js'],
	},
	module: {
		rules: [
			{
				test: /\.ts$/,
				use: ['ts-loader'],
				exclude: /node_modules/,
			},
			{
				test: /\.js$/,
				use: ['babel-loader'],
				exclude: /node_modules/,
			},
			{
				test: /\.js$/,
				exclude: /(node_modules|hakureijs)/,
				loader: 'eslint-loader',
				options: {
					// fix wrong files automatically
					fix: true,
				},
			},
		],
	},
	devServer: {
		port: 3000,
		host: "0.0.0.0",
		disableHostCheck: true,
		contentBase: `${ __dirname }/public/`,
		open: true,
	},
	  plugins: [
		new WebpackBuildNotifierPlugin({
			suppressSuccess: "initial",
		})
	],
};

module.exports = [js];
