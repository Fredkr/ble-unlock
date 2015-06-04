var bleacon = require('bleacon'),
	screenSaver = require('./screenLocker'),
	settings = require('./settings'),
	logger = require('./logger'),
	util = require('util'),
	isScanning = false,
	self = this;

self.toggleScanner = function(callback) {

	if (isScanning) {
		logger.info('scan stopped');
		bleacon.stopScanning();
		isScanning = false;
		callback();

	} else {
		initiateScan(function(){
			logger.info('scan started');
			isScanning = true;
			callback();
		});

	}
}

self.isScanning = function() {
	return isScanning;
}

var initiateScan = function(callback) {

	settings.listByType("device",function(devices){
		var unlockuuids = devices.filter(function(item){
    		return item.action === 'unlock';  
		});
		unlockuuids =  unlockuuids.map(function(obj){ 
	       return obj.uuid;
	    });
	    var lockuuids = devices.filter(function(item){
    		return item.action === 'lock';  
		});
	    lockuuids =  lockuuids.map(function(obj){ 
	       return obj.uuid;
	    });

		startScanning(unlockuuids, lockuuids);
		callback();
	});
}

var startScanning = function(unlockUuids, lockUuids){
	var self = this;
	self.timeOut = false;

	bleacon.startScanning(lockUuids.concat(unlockUuids));

	bleacon.on('discover', function(bleacon) {
		//console.log(util.inspect(bleacon, {showHidden: false, depth: null}));

		if (!self.timeOut) {
			self.timeOut = true;
			screenSaver.screenIsActive(function(screenIsActive) {
				if (screenIsActive && lockUuids.contains(bleacon.uuid)) {
					screenSaver.lockScreen();
				} else if (!screenIsActive && unlockUuids.contains(bleacon.uuid)) {
					screenSaver.unlockScreen();
				}

				setTimeout(function() {
					self.timeOut = false;
				}, 500);
			});
		}
	});
}

module.exports = {
	toggleScanner: self.toggleScanner,
	isScanning: self.isScanning
};