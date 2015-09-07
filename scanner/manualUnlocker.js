'use strict';
var bleacon = require('bleacon'),
    screenManager = require('./screenManager'),
    settings = require('./settings'),
    lockTimeout = false,
    lockTimer;

function startScanning(callback) {
    settings.getSeveralByType('device', function(result) {
        var deviceUuids = result.data.map(function(obj){
            return obj.value.uuid;
        });

        startScanningToggleMode(deviceUuids);
        callback();
    });
}

function stopScanning(){
    bleacon.stopScanning();
}

function setLockTimer(time){
    clearTimeout(lockTimer);
    lockTimer = setTimeout(function() {
        lockTimeout = false;
    }, time);
}

function startScanningToggleMode(uuids){
    lockTimeout = false;
    bleacon.startScanning(uuids);

    bleacon.on('discover', function(bleacon) {
        if (uuids.contains(bleacon.uuid) && !lockTimeout) {
            lockTimeout = true;

            screenManager.screenIsActive(function(screenIsActive) {
                if (screenIsActive) {
                    screenManager.lockScreen();
                } else if (!screenIsActive) {
                    screenManager.unlockScreen();
                }
                setLockTimer(1500);
            });
        }
    });
}

module.exports = {
    startScanning: startScanning,
    stopScanning: stopScanning
};
