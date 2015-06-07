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

self.synchronizeDevice = function(callback){
	var promise = new Promise(function(resolve, reject) {
		var noResult = setTimeout(function() {
			bleacon.stopScanning();
			resolve("test"); 
		}, 10000);

		bleacon.startScanning();
		bleacon.on('discover', function(beacon) {
			if(beacon.proximity === 'immediate'){
				bleacon.stopScanning();
				clearTimeout(noResult);
				resolve(beacon.uuid);
			}
		});
	});

	promise.then(function(data) {
		return callback(data)
	});
}

var initiateScan = function(callback) {

	settings.listByType("device",function(devices){
	    var deviceUuids =  devices.map(function(obj){ 
	       return obj.uuid;
	    });

		startScanningToggleMode(deviceUuids);
		callback();
	});
}

var startScanningToggleMode = function(uuids){
	var self = this;
	self.timeOut = false;

	bleacon.startScanning(uuids);

	bleacon.on('discover', function(bleacon) {

		//console.log(util.inspect(bleacon, {showHidden: false, depth: null}));
		if (uuids.contains(bleacon.uuid) && !self.timeOut) {
			self.timeOut = true;
			screenSaver.screenIsActive(function(screenIsActive) {
				if (screenIsActive) {
					screenSaver.lockScreen();
				} else if (!screenIsActive) {
					screenSaver.unlockScreen();
				}

				setTimeout(function() {
					self.timeOut = false;
				}, 1500);
			});
		}
	});
}

module.exports = {
	toggleScanner: self.toggleScanner,
	isScanning: self.isScanning,
	synchronizeDevice: self.synchronizeDevice
};