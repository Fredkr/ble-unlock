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

self.listByType =  function(type, callback) {
    db.settings.find({"type":type}, function(err, documents){
        callback(documents);
    });
}

self.getByType =  function(type, callback ) {
    db.settings.findOne({ "type": type }, function (err, doc) {
        if(err || doc === null){
            return callback({success: false, msg: err});
        }
        return callback({success: true, data: doc.value});

    });
}

self.getSeveralByTypes =  function(types, callback ) {
    var lookUp = [];
    for (i = 0; i < types.length; i++) { 
        lookUp.push({type: types[i]});
    }
    db.settings.find({ $or: lookUp }, function (err, docs) {
       if(err || docs === 'undefined' || docs.length === 0){
            return callback({success: false, msg: err});
        }
        return callback({success: true, data: docs});

    });
}

self.findAll = function(callback){
    db.settings.find({}, function (err, docs) {
        callback(docs);
    });
}

self.create =  function(type, newVal, callback) {
    self.getByType(type, function(result){
        if(result.success){
            self.update(type, newVal, function(result){
                callback(result);
            });
        }else {
            db.settings.insert({
                type: type,
                value: newVal    
            }, function (err, newDoc) { 
                if(err){
                    callback({success: false, msg: err});
                }
                callback({success: true, data: newDoc});
            });
        }
    })
}

self.update = function(type, newVal, callback){

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



module.exports = {
    findAll: self.findAll,
    listByType: self.listByType,
    getByType: self.getByType,
    getSeveralByTypes: self.getSeveralByTypes,
    create: self.create,
    remove: self.remove
};