'use strict';
var path = require('path'),
    Datastore = require('nedb'),
    db = {
        settings: new Datastore({
            filename: path.join(__dirname, 'settings.db'),
            autoload: true
        })
    };

function getByType(type, callback ) {
    db.settings.findOne({ 'type': type }, function (err, doc) {
        if(err || doc === null){
            return callback({success: false, msg: err});
        }
        return callback({success: true, data: doc.value});
    });
}

function getSeveralByType(type, callback) {
    db.settings.find({'type':type}, function(err, docs){
        if(err || docs === 'undefined' || docs.length === 0){
            return callback({success: false, data: [], msg: 'no results found'});
        }
        return callback({success: true, data: docs});
    });
}

function getSeveralByTypes(types, callback ) {
    var lookUp = [];
    for (var i = 0; i < types.length; i++) {
        lookUp.push({type: types[i]});
    }
    db.settings.find({ $or: lookUp }, function (err, docs) {
        if(err || docs === 'undefined' || docs.length === 0){
            return callback({success: false, msg: 'no results found'});
        }
        return callback({success: true, data: docs});
    });
}

function remove(id, callback) {
    db.settings.remove(
    { _id: id },
    {},
    function (err) {
        if(err){
            callback({success: false, msg: err});
        }
        callback({success: true});
    });
}

function createDevice(newDevice, callback) {
    getSeveralByType('device', function(result){
        if(result.success && result.data.some(validateUniqueDevice.bind(this, newDevice.uuid))){
            callback({success: false, msg: 'Device already exists'});
        }else {
            insertDocument('device', newDevice, callback);
        }
    });
}

function createOrUpdateSetting(type, newDoc, callback) {
    getByType(type, function(result){
        if(result.success){
            update(type, newDoc, function(result){
                callback(result);
            });
        }else {
            insertDocument(type, newDoc, callback);
        }
    });
}

function validateUniqueDevice(uuid, e){
    return e.value.uuid === uuid;
}

function insertDocument(type, newDoc, callback){
    db.settings.insert({
        type: type,
        value: newDoc
    }, function (err, newDoc) {
        if(err){
            callback({success: false, msg: err});
        }
        callback({success: true, data: newDoc});
    });
}

function update(type, newVal, callback){
    db.settings.update(
        { type: type },
        { $set: { value: newVal } },
        { multi: false },
        function (err) {
            if(err){
                callback({success: false, msg: err});
            }
            callback({success: true});
        });
}

module.exports = {
    getByType: getByType,
    getSeveralByType: getSeveralByType,
    getSeveralByTypes: getSeveralByTypes,
    createDevice: createDevice,
    createOrUpdateSetting: createOrUpdateSetting,
    remove: remove
};
