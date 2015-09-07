'use strict';
var bleacon = require('bleacon'),
    screenManager = require('./screenManager'),
    settings = require('./settings'),
    lockTimerInterval = 15000,
    lockTimer;

function isWithinDistance(rssi, measuredPower){
    var accuracy = Math.pow(12.0, 1.5 * ((rssi / measuredPower) - 1));

    if (accuracy > 0 && accuracy < 0.5) {
        //Proximity 'immediate'
        return true;
    } else if (accuracy > 0.5 && accuracy < 3.0) {
        //Proximity 'near'
        return true;
    }
    return false;
}

function startScanning(callback) {
    settings.getSeveralByType('device', function(result){
        var deviceUuids = result.data.map(function(obj){
            return obj.value.uuid;
        });

        startScanningProximityMode(deviceUuids);
        callback();
    });
}

function stopScanning(){
    clearTimeout(lockTimer);
    bleacon.stopScanning();
}

function startLockTimer(){
    clearTimeout(lockTimer);
    lockTimer = setTimeout(function() {
        screenManager.lockScreen();
    }, lockTimerInterval);
}

function resetLockTimer(){
    clearTimeout(lockTimer);
    startLockTimer();
}

function startScanningProximityMode(uuids){
    bleacon.startScanning();
    startLockTimer();

    bleacon.on('discover', function(beacon) {
        if(uuids.contains(beacon.uuid) && isWithinDistance(beacon.rssi, beacon.measuredPower)){
            screenManager.screenIsActive(function(screenIsActive) {
                if (screenIsActive) {
                    resetLockTimer();
                } else if (!screenIsActive) {
                    screenManager.unlockScreen();
                    startLockTimer();
                }
            });
        }
    });
}

module.exports = {
    startScanning: startScanning,
    stopScanning: stopScanning
};
