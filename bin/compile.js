import _debug from 'debug'
import config from '../config/config'
import webpackConfig from '../config/webpack.config'
import webpackCompiler from './webpack-compiler'

const debug = _debug('app:bin:compile')

;(async function () {
	try {
		debug('running compiler')	
		const stats = await webpackCompiler(webpackConfig)
		if (stats.warnings.length && config.compiler_fail_on_warning) {
			debug('config set to fail on warning exit status 1')	
			process.exit(1)
		}
	} 
	catch (e) {
		debug('compiler encountered an error.', e)	
		process.exit(1)
	}
})()
