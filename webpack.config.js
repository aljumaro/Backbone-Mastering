const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackIncludeAssetsPlugin = require('html-webpack-include-assets-plugin');
const webpack = require('webpack');
const path = require('path');

const config = {
	entry: './app/js/index.js',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'app.bundle.js'
	},
	module: {
		rules: [
			{
				test: /\.js$/, 
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
			        options: {
			          presets: ['es2015']
			        }
			    }
			},
			{ 
				test: /\.handlebars$/, 
				exclude: /node_modules/,
				use: {
					loader: "handlebars-loader",
					options: {
						helperDirs: [path.resolve(__dirname, 'src/js/helpers')],
						partialDirs: [path.resolve(__dirname, 'src/js/partials')]
					}
				}
			}
		]
	},
	resolve: {
	    extensions: ['.js'],
	    alias: {
	      'App': path.resolve(__dirname, './app/js/app')
	    }
	  },
	plugins: [
		/*new CopyWebpackPlugin([
		    { from: 'src/css', to: 'css/' }
		]),*/
		new HtmlWebpackPlugin({
			template: './app/index.html'
		}),
		/*new HtmlWebpackIncludeAssetsPlugin({
		    assets: ['css/base.css'],
		    append: false
		}),*/
		new webpack.optimize.UglifyJsPlugin(),
		new webpack.ProvidePlugin({
			$: 'jquery',
			jQuery: 'jquery',
			_: 'underscore',
			Backbone: 'backbone',
			App: 'App'
		})
	],
	devtool: 'eval'
}

module.exports = config;