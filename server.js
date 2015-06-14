

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
		if(result.success){
			res.status(200).send(result.data);
		}else{
			res.status(400).send(result.msg);
		}
	});
});

app.get('/get/devices/', function(req, res) {
	settings.listByType("device",function(devices){
		res.send(devices);
	});
});

app.get('/get/settings/password-is-set', function(req, res) {
	settings.getSeveralByTypes(['password'], function(result){
		if(result.success){
			res.send(true);
		}else {
			res.send(false);
		}
	});
});
app.get('/get/settings/general', function(req, res) {
	var types = ['', ''];
	settings.getSeveralByTypes(types, function(result){
		if(result.success){
			res.send(result);
		}
	});
});

app.post('/post/setting', function(req, res){
	if(req.body.type === '' || req.body.value === ''){
		res.status(400).send({msg: 'Invalid request'});
		return;
	}
	settings.create(req.body.type, req.body.value, function(result){
		if(result.success){
			res.status(200).send(result.data);
		}else {
			res.status(400).send(result.msg);
		}
	});

});

app.post('/post/device', function(req, res){

	var newDoc = {
		name: req.body.name,
		uuid: req.body.uuid
		};
	settings.create("device", newDoc, function(result){
		if(result.success){
			res.status(200).send(result.data);
		}else{
			res.status(400).send(result.msg);
		}
	});
});

app.delete('/delete/device', function(req, res) {
	if(req.body.id === ''){
		res.status(400).send({msg: 'Id is missing'});
	}

	settings.remove(req.body.id, function(result){
		if(result.success){
			res.status(200).send({msg: 'success'});
		}else{
			res.status(400).send(result.msg);
		}
	});

});