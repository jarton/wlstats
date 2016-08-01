import path from 'path'
import { argv } from 'yargs'

const config = {

env: process.env.NODE_ENV || 'development',

	// project struct
path_base: path.resolve(__dirname, '..'),
dir_client: 'src',
dir_dist: 'dist',
dir_server: 'server',

	// server
server_host: 'localhost',
server_port: 6969,

	// webpack compiler
compiler_devtool: 'source-map',
compiler_public_path: '/',
compiler_hash_type: 'hash',
compiler_fail_on_warning: false,
compiler_stats: {
	chunks: false,
	chunkModules: false,
	colors: true
}

}

config.globals = {
  'process.env'  : {
    'NODE_ENV' : JSON.stringify(config.env)
  },
  'NODE_ENV'     : config.env,
  '__DEV__'      : config.env === 'development',
  '__PROD__'     : config.env === 'production',
  '__TEST__'     : config.env === 'test',
  '__DEBUG__'    : config.env === 'development' && !argv.no_debug,
  '__COVERAGE__' : !argv.watch && config.env === 'test',
  '__BASENAME__' : JSON.stringify(process.env.BASENAME || '')
}

	// utils 
const base = (...args) =>
	Reflect.apply(path.resolve, null, [config.path_base, ...args])

config.utils_paths = {
	base: base,
	client: base.bind(null, config.dir_client),
	dist: base.bind(null, config.dir_dist),
}

export default config
