var noble = require('noble'),
	screenSaver = require('./screenLocker'),
	config = require('./config'),
	logger = require('./logger');

exports.scan = function() {
	noble.on('scanStart', function() {
		logger.info("Scan started.");
	});

	noble.on('scanStop', function() {
	    logger.info("Scan stopped.");
	});

	noble.on('discover', function(peripheral) {

	  	if(peripheral.advertisement.localName !== config.bleDeviceName) return;

		peripheral.on('connect', function(){
	  		logger.info('connected');

		});
		peripheral.on('disconnect', function(){
	  		logger.info('disconnected from peripheral: ' + peripheral.uuid + ' name: '+peripheral.advertisement.localName);
		});
	
	  	peripheral.connect(function(error) {
	  		console.log('connected to peripheral: ' + peripheral.uuid + ' name: '+peripheral.advertisement.localName);
	  	});
	});

	var allowDuplicates = false; 
	noble.startScanning([], allowDuplicates);

}