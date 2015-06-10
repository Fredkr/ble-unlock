Array.prototype.contains = function(element) {
	return this.indexOf(element) > -1;
};

var express = require('express'),
	bodyParser = require('body-parser'),
	bleScan = require('./scanner/bleScanner'),
	logger = require('./scanner/logger'),
	settings = require('./scanner/settings'),
	util = require('util'),
	app = express();

app.use(bodyParser.json());
app.use(express.static('client/public'));
app.use(bodyParser.urlencoded({extended: true}));
app.listen(3001, 'localhost', function() {});

app.get('/toggle-scanner', function(req, res) {
	bleScan.toggleScanner(function() {
		res.send('{"active":' + bleScan.isScanning() + '}');
	});
});

app.get('/get/scanner-active', function(req, res) {
	res.send('{"active":' + bleScan.isScanning() + '}');
});

app.get('/get/new-devices', function(req, res) {
	bleScan.scanForNewDevices(function(result){
		if(result.status === 'error'){
			res.status(400).send(result.msg);
		}else{
			res.status(200).send(result);
		}
	});
});

app.get('/get/devices/', function(req, res) {
	settings.listByType("device",function(devices){
		res.send(devices);
	});
});

app.post('/post/device', function(req, res){
	var newDoc = {
		name: req.body.name,
		uuid: req.body.uuid
		};
	settings.create("device", newDoc, function(status){
		res.send(status);
	});
});