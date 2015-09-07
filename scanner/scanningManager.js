'use strict';
var bleacon = require('bleacon'),
    settings = require('./settings'),
    manualUnlocker = require('./manualUnlocker'),
    proximityUnlocker = require('./proximityUnlocker'),
    logger = require('./logger'),
    isScanning = false,
    isInSetup = false;

function getScanner(callback){
    settings.getByType('proximityMode', function(proximityMode){
        if(proximityMode.data === true){
            return callback(proximityUnlocker);
        } else {
            return callback(manualUnlocker);
        }
    });
}

function toggleScanner(callback) {

    getScanner(function(scanner){
        if (isScanning) {
            logger.info('scan stopped');
            scanner.stopScanning();
            isScanning = false;
            callback();
        } else {
            scanner.startScanning(function(){
                logger.info('scan started');
                isScanning = true;
                callback();
            });
        }
    });
}

function isScanningForDevices() {
    return isScanning;
}

var toggleSetupMode = function(){
    isInSetup = !isInSetup;
    bleacon.stopScanning();

    if(isInSetup){

    }else {
        isScanning = false;
    }
};

function scanForNewDevices(callback){
    toggleSetupMode();

    var promise = new Promise(function(resolve, reject) {
        var synchronizationInterval;
        setTimeout(function() {
            clearInterval(synchronizationInterval);
            reject('No devices found');
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
        return callback({success: true, data: data});
    }, function(err) {
            toggleSetupMode();
            return callback({success: false, msg: err});
        });
}

module.exports = {
    toggleScanner: toggleScanner,
    isScanning: isScanningForDevices,
    scanForNewDevices: scanForNewDevices
};
