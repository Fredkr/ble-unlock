'use strict';
Array.prototype.contains = function(element) {
    return this.indexOf(element) > -1;
};
var express = require('express'),
    bodyParser = require('body-parser'),
    bleScan = require('./scanner/scanningManager'),
    settings = require('./scanner/settings'),
    logger = require('./scanner/logger'),
    PORT = 3001,
    HOSTNAME = 'localhost',
    app = express();

app.use(bodyParser.json());
app.use(express.static('client/public/'));
app.use(bodyParser.urlencoded({extended: true}));
app.listen(PORT, HOSTNAME, function () {
    logger.info('Express server is running: go to http://' + HOSTNAME + ':' + PORT);
});

app.get('/toggle-scanner', function (req, res) {
    bleScan.toggleScanner(function () {
        res.send('{"active":' + bleScan.isScanning() + '}');
    });
});

app.get('/get/scanner-active', function (req, res) {
    res.send('{"active":' + bleScan.isScanning() + '}');
});

app.get('/get/new-devices', function (req, res) {
    bleScan.scanForNewDevices(function (result) {
        if (result.success) {
            return res.status(200).send(result.data);
        }
        return res.status(400).send(result.msg);
    });
});

app.get('/get/devices', function (req, res) {
    settings.getSeveralByType('device', function (result) {
        if (result.success) {
            return res.status(200).send(result.data);
        }
        return res.status(400).send(result.msg);
    });
});

app.post('/get/setting/', function (req, res) {
    if (req.body.type === '') {
        return res.status(400).send('Invalid request');
    }
    settings.getByType(req.body.type, function (result) {
        if (result.success) {
            return res.send(result.data);
        }
        return res.send(false);
    });
});

app.get('/get/settings/general', function (req, res) {
    var types = ['', ''];
    settings.getSeveralByTypes(types, function (result) {
        if (result.success) {
            return res.send(result);
        }
    });
});

app.post('/post/setting', function (req, res) {
    if (req.body.type === '' || req.body.value === '') {
        return res.status(400).send('Invalid request');
    }
    settings.createOrUpdateSetting(req.body.type, req.body.value, function (result) {
        if (result.success) {
            return res.status(200).send(result.data);
        }
        return res.status(400).send(result.msg);
    });
});

app.post('/post/device', function (req, res) {
    if (req.body.name === '' || req.body.uuid === '') {
        return res.status(400).send('Incomplete device information');
    }
    var newDoc = {
        name: req.body.name,
        uuid: req.body.uuid
    };
    settings.createDevice(newDoc, function (result) {
        if (result.success) {
            return res.status(200).send(result.data);
        }
        return res.status(400).send(result.msg);
    });
});

app.delete('/delete/device', function (req, res) {
    if (req.body.id === '') {
        return res.status(400).send('Id is missing');
    }
    settings.remove(req.body.id, function (result) {
        if (result.success) {
            return res.status(200).send('success');
        }
        return res.status(400).send(result.msg);
    });
});
