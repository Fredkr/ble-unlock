var bleacon = require('bleacon'),
	screenSaver = require('./screenLocker'),
	config = require('./config'),
	logger = require('./logger'),
	util = require('util');

exports.scan = function() {
	bleacon.startScanning();
	logger.info('scan started');
	var self = this;
	self.timeOut = false;

	bleacon.on('discover', function(bleacon) {
		console.log(util.inspect(bleacon, {showHidden: false, depth: null}));

		if(!self.timeOut){
			self.timeOut = true;
			screenSaver.screenIsActive(function(screenIsActive) {
				if(screenIsActive && bleacon.uuid === '0d65410849314945b4120615bdb895b5'){
					screenSaver.lockScreen();
				}
				else if(!screenIsActive && bleacon.uuid === 'bdbed62785c14e33a755ff3e956262e4'){
					screenSaver.unlockScreen();			
				}

				setTimeout(function () {self.timeOut = false;}, 500);
			});
		}
	});
}
