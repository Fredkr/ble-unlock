var bleacon = require('bleacon'),
	screenSaver = require('./screenLocker'),
	settings = require('./settings'),
	logger = require('./logger'),
	util = require('util'),
	isScanning = false,
	isInSetup = false,
	lockTimeout = false,
	synchronizationInterval,
	lockTimer,
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

self.scanForNewDevices = function(callback){
	toggleSetupMode();

	var promise = new Promise(function(resolve, reject) {

		setTimeout(function() {
			reject("No devices found");
		}, 15000);

		var uuids = [];
		bleacon.startScanning();
		bleacon.on('discover', function(beacon) {
			if(beacon.proximity === 'immediate' && !uuids.contains(beacon.uuid)){
				uuids.push(beacon.uuid);
			}
		});

		synchronizationInterval = setInterval(function() {
			if(uuids.length > 0){
				clearInterval(synchronizationInterval);
				resolve(uuids); 
			}
		}, 4500);

	});

	promise.then(function(data) {
		toggleSetupMode();
		return  callback({success: true, data: data});
	}, function(err) {
	  	toggleSetupMode();
		return callback({success: false, msg: err});
	});
}

var initiateScan = function(callback) {

	settings.listByType("device",function(devices){
	    var deviceUuids =  devices.map(function(obj){ 
	       return obj.data.uuid;
	    });

		startScanningToggleMode(deviceUuids);
		callback();
	});
}

var startScanningToggleMode = function(uuids){
	lockTimeout = false;
	bleacon.startScanning(uuids);

	bleacon.on('discover', function(bleacon) {

		//console.log(util.inspect(bleacon, {showHidden: false, depth: null}));
		if (uuids.contains(bleacon.uuid) && !lockTimeout && !isInSetup) {
			lockTimeout = true;

			screenSaver.screenIsActive(function(screenIsActive) {
				if (screenIsActive) {
					screenSaver.lockScreen();
				} else if (!screenIsActive) {
					screenSaver.unlockScreen();
				}
				clearTimeout(lockTimer);
				lockTimer = setTimeout(function() {
					lockTimeout = false;
				}, 1500);
			});
		}
	});
}

var toggleSetupMode = function(){
	isInSetup = !isInSetup;
	bleacon.stopScanning();

	if(isInSetup){
		clearTimeout(lockTimer);
	}else {
		isScanning = false;
		clearTimeout(lockTimer);
	}
};

module.exports = {
	toggleScanner: self.toggleScanner,
	isScanning: self.isScanning,
	scanForNewDevices: self.scanForNewDevices
};