var path = require('path'),
	webpack = require('webpack'),
	projectRoot = path.resolve(__dirname, './');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry: [
		"babel-polyfill",
		'./src/main.js',
		'webpack-hot-middleware/client?reload=true'
	],
	output: {
		path: __dirname + '/dist/',
		publicPath: '/',
		filename: 'build.js'
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoEmitOnErrorsPlugin(),
		new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"development"'
      }
    }),
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
	],
	module: {
		loaders: [
			{
				test: /\.vue$/,
				loader: 'vue-loader'
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
				loaders: 'style-loader!css-loader!sass-loader'
			}, {{/sass}}{
				test: /\.css$/,
				loader: 'style-loader!css-loader'
			}
		]
	},
	resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    }
  },
	devServer: {
		historyApiFallback: true,
		noInfo: true
	},
	devtool: '#eval-source-map'
};
