var self = this,
    path = require('path'),
    util = require('util'),
    Datastore = require('nedb'),
    db = {
        settings: new Datastore({
            filename: path.join(__dirname, 'settings.db'),
            autoload: true
        })
    };

self.getByType =  function(type, callback ) {
    db.settings.findOne({ "type": type }, function (err, doc) {
        if(err || doc === null){
            return callback({success: false, msg: err});
        }
        return callback({success: true, data: doc.value});
    });
}

self.getSeveralByType =  function(type, callback) {
    db.settings.find({"type":type}, function(err, docs){
        if(err || docs === 'undefined' || docs.length === 0){
            return callback({success: false, data: [], msg: 'no results found'});
        }
        return callback({success: true, data: docs});
    });
}

self.getSeveralByTypes =  function(types, callback ) {
    var lookUp = [];
    for (i = 0; i < types.length; i++) { 
        lookUp.push({type: types[i]});
    }
    db.settings.find({ $or: lookUp }, function (err, docs) {
       if(err || docs === 'undefined' || docs.length === 0){
            return callback({success: false, msg: 'no results found'});
        }
        return callback({success: true, data: [], data: docs});
    });
}

self.remove = function(id, callback) {
    db.settings.remove(
    { _id: id },
    {},
    function (err, numRemoved) {
        if(err){
            callback({success: false, msg: err});
        }
        callback({success: true});
    });
}

self.createDevice =  function(newDevice, callback) {
    self.getSeveralByType('device', function(result){
        if(result.success && result.data.some(validateUniqueDevice.bind(this, newDevice.uuid))){
            callback({success: false, msg: 'Device already exists'});
        }else {
            insertDocument('device', newDevice, callback);
        }
    })
}

self.createOrUpdateSetting =  function(type, newDoc, callback) {
    self.getByType(type, function(result){
        if(result.success){
            update(type, newDoc, function(result){
                callback(result);
            });
        }else {
            insertDocument(type, newDoc, callback);
        }
    })
}

var validateUniqueDevice = function(uuid, e, index, array){
    return e.value.uuid === uuid;
};

var insertDocument = function(type, newDoc, callback){
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

var update = function(type, newVal, callback){

    db.settings.update(
        { type: type },
        { $set: { value: newVal } },
        { multi: false },
        function (err, numReplaced) {
            if(err){
                callback({success: false, msg: err});
            }
            callback({success: true});   
    });
}

module.exports = {
    getByType: self.getByType,
    getSeveralByType: self.getSeveralByType,
    getSeveralByTypes: self.getSeveralByTypes,
    createDevice: self.createDevice,
    createOrUpdateSetting: self.createOrUpdateSetting,
    remove: self.remove
};