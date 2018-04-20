module.exports = function (env) {
	let config = {}
	if (env === 'production') {
		config = require('./webpack.prod')
	} else {
		config = require('./webpack.dev')
	}
	return config
}
