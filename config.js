var fs = require( 'fs' ),
	config = JSON.parse( fs.readFileSync( 'config.json','utf8' ));

module.exports = config;