var path = require('path'),
	webpack = require('webpack'),
	projectRoot = path.resolve(__dirname, './');

const ExtractTextPlugin = require('extract-text-webpack-plugin'),
	HtmlWebpackPlugin = require('html-webpack-plugin'),
	CompressionPlugin = require('compression-webpack-plugin'),
	UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
	entry: [
		"babel-polyfill",
		'./src/main.js'
	],
	output: {
		path: __dirname + '/dist/',
		publicPath: '/',
		filename: 'appBuild.[chunkhash].js'
	},
	plugins: [
		new webpack.NoEmitOnErrorsPlugin(),
		new ExtractTextPlugin({filename: '[name].[hash].css'}),
		new HtmlWebpackPlugin({
			filename: 'index.html',
			inject: true,
			minify: {
				removeComments: true,
				collapseWhitespace: true,
				removeAttributeQuotes: true
			},
			template: 'index.html'
		}),
		new CompressionPlugin({
			asset: "[path].gz[query]",
			algorithm: "gzip",
			test: /\.js$|\.css$|\.html$/,
			threshold: 10240,
			minRatio: 0.8
		})
	],
	module: {
		rules: [
			{
				test: /\.vue$/,
				loader: 'vue-loader',
				options: {
					extractCSS: true
				}
			}, {
				test: /\.js$/,
				loader: 'babel-loader',
				exclude: /node_modules/
			}, {
				test: /\.(png|jpg|gif|svg)$/,
				loader: 'file-loader',
				query: {
					name: '[name].[ext]?[hash]'
				}
			},
			{{#sass}}
			{
				test: /\.scss$/,
				use: ExtractTextPlugin.extract({
					fallback: "style-loader",
					use: ['css-loader', 'sass-loader']
				})
			}, {{/sass}}{
				test: /\.css$/,
				use: ExtractTextPlugin.extract({
					fallback: "style-loader",
					use: ['css-loader']
				})
			}
		]
	}
};

if (process.env.NODE_ENV === 'production') {
	module.exports.devtool = '#source-map';
	// http://vue-loader.vuejs.org/en/workflow/production.html
	module.exports.plugins = (module.exports.plugins || []).concat([
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: '"production"'
			}
		}),
		new UglifyJsPlugin({
			uglifyOptions: {
				compress: {
					warnings: false,
					drop_console: true
				}
			}
		})
	]);
}
