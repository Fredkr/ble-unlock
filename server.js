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

app.get('/toggleScanner', function(req, res) {
	bleScan.toggleScanner(function() {
		res.send('{"active":' + bleScan.isScanning() + '}');
	});
});

app.get('/get/scannerActive', function(req, res) {
	res.send('{"active":' + bleScan.isScanning() + '}');
});

app.get('/get/validDevices/', function(req, res) {

	settings.listByType("device",function(devices){
		var filteredDevices = devices.filter(function(item){
    		return item.action === req.query.action;  
		});
		res.send(filteredDevices);
	});
});

app.post('/post/addDevice', function(req, res){
	var newDoc = {
		name: req.body.name,
		uuid: req.body.uuid,
		action: req.body.action
	};
	settings.create("device", newDoc, function(status){
		res.send(status);
	});
});