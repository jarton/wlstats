import webpack from 'webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import _debug from 'debug'
import config from './config'


const debug = _debug('app:webpack:config')
const { __DEV__, __PROD__, __TEST__} = config.globals

const webpackConfig = {
	
	name: 'client',
	target: 'web',
	devtool: config.compiler_devtool,
	resolve: {
	},
	module: {}
}

// ---------------------------------
// ENTRY
// ---------------------------------

const APP_ENTRY_PATHS = [
	config.utils_paths.client('main.js')
]

webpackConfig.entry = {
	app: __DEV__ 
		? APP_ENTRY_PATHS.concat(`webpack-hot-middleware/client?path=${config.compiler_public_path}__webpack_hmr`)
		: APP_ENTRY_PATHS
}

debug(webpackConfig.entry.app)

// ---------------------------------
// OUTPUT
// ---------------------------------
webpackConfig.output = {
	filename: `[name].[${config.compiler_hash_type}].js`,
	path: config.utils_paths.dist(),
	publicPath: config.compiler_public_path

}

// ---------------------------------
// PLUGINS
// ---------------------------------
webpackConfig.plugins = [
	new webpack.DefinePlugin(config.globals),
	new HtmlWebpackPlugin({
		template: config.utils_paths.client('index.html'),
		hash: false,
		filename: 'index.html',
		inject: 'body',
		minify: {
			collapseWhitespace: true	
		}
	}),
	new webpack.HotModuleReplacementPlugin(),
	new webpack.NoErrorsPlugin()
]

// ---------------------------------
// LOADERS
// ---------------------------------
// JS / JSON
webpackConfig.module.loaders = [
	{
		test: /\.(js|jsx)$/,
		exclude: /node_modules/,
		loader: 'babel',
		query: {
			cacheDirectory: true,
			plugins: ['transform-runtime'],
			presets: ['es2015', 'react', 'stage-0'],
		}
	},
	{
		test: /\.json$/,
		loader: 'json'
	}
]

// File loaders
/* eslint-disable */
webpackConfig.module.loaders.push(
  { test: /\.woff(\?.*)?$/,  loader: 'url?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=application/font-woff' },
  { test: /\.woff2(\?.*)?$/, loader: 'url?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=application/font-woff2' },
  { test: /\.otf(\?.*)?$/,   loader: 'file?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=font/opentype' },
  { test: /\.ttf(\?.*)?$/,   loader: 'url?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=application/octet-stream' },
  { test: /\.eot(\?.*)?$/,   loader: 'file?prefix=fonts/&name=[path][name].[ext]' },
  { test: /\.svg(\?.*)?$/,   loader: 'url?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=image/svg+xml' },
  { test: /\.(png|jpg)$/,    loader: 'url?limit=8192' }
)
/* eslint-enable */


export default webpackConfig

