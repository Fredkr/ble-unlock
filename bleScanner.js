var bleacon = require('bleacon'),
	screenSaver = require('./screenLocker'),
	config = require('./config'),
	logger = require('./logger'),
	util = require('util');

exports.scan = function() {
	bleacon.startScanning();
	logger.info('scan started');
	var lockedState = false;

	bleacon.on('discover', function(bleacon) {
		//console.log(util.inspect(bleacon, {showHidden: false, depth: null}));
		if(!lockedState && bleacon.uuid === '389ae052210b4cc8a5d2d6e9236e50bd'){
			logger.info('lock');
			lockedState = true;
			screenSaver.lockScreen();
		}
		if(lockedState && bleacon.uuid === 'a82e33d9b9ba4dc6b1f1fd2060922787'){
			logger.info('unlock');
			lockedState = false;
			screenSaver.unlockScreen();
		}
	});
}
