Array.prototype.contains = function(element){
    return this.indexOf(element) > -1;
};

var bleScan =require('./bleScanner');
bleScan.scan();

