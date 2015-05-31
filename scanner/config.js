var fs = require( 'fs' ),
	config = JSON.parse( fs.readFileSync( __dirname + '/config.json','utf8' ));

module.exports = config;