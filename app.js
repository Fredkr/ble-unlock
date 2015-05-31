Array.prototype.contains = function(element) {
	return this.indexOf(element) > -1;
};

var express = require('express'),
	bleScan = require('./scanner/bleScanner');

var app = express();
app.use(express.static('client'));
app.listen(3001, 'localhost', function() {});

app.get('/toggleScanner', function(req, res) {
	bleScan.toggleScanner(function() {
		res.send('{"active":' + bleScan.isScanning() + '}');
	});
});

app.get('/scannerActive', function(req, res) {
	res.send('{"active":' + bleScan.isScanning() + '}');
});