var bleacon = require('bleacon'),
	screenSaver = require('./screenLocker'),
	config = require('./config'),
	logger = require('./logger'),
	util = require('util');

exports.scan = function() {
	var uuids = config.lockUUIDs.concat( config.unlockUUIDs );
	bleacon.startScanning(uuids);
	logger.info('scan started');
	var self = this;
	self.timeOut = false;

	bleacon.on('discover', function(bleacon) {
		//console.log(util.inspect(bleacon, {showHidden: false, depth: null}));

		if(!self.timeOut){
			self.timeOut = true;
			screenSaver.screenIsActive(function(screenIsActive) {
				if(screenIsActive && config.lockUUIDs.contains(bleacon.uuid)){
					screenSaver.lockScreen();
				}
				else if(!screenIsActive && config.unlockUUIDs.contains(bleacon.uuid)){
					screenSaver.unlockScreen();	
				}

				setTimeout(function () {self.timeOut = false;}, 500);
			});
		}
	});
}
