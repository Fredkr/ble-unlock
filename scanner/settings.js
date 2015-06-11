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
        callback(doc)
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
        value: data    
    }, function (err, newDoc) { 
        if(err){
            callback({success: false, msg: err});
        }
        callback({success: true, data: newDoc});
    });
}

self.remove = function(id, callback) {
    db.settings.remove({
     _id: id 
    },
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
    create: self.create,
    remove: self.remove
};