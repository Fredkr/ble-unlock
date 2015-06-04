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
        var flatObjects =  documents.map(function(obj){ 
           return obj.data;
        });
        callback(flatObjects);
    });
}

self.getByType =  function(type, callback ) {
    db.settings.findOne({ "type": type }, function (err, doc) {
        callback(doc.data)
    });
}

self.findAll = function(callback){
    db.settings.find({}, function (err, docs) {
        callback(docs);
    });
}

self.create =  function(type, data, callback) {
    db.settings.insert({
        type: type,
        data: data    
    }, function (err, newDoc) { 
        if(err){
            callback({success: false, message: err});
        }
        callback({success: true, message: 'Success'});
    });
}

self.remove = function(id, callback) {
    db.settings.remove({
        _id: id
    }, callback);
}


module.exports = {
    findAll: self.findAll,
    listByType: self.listByType,
    getByType: self.getByType,
    create: self.create,
    remove: self.remove
};