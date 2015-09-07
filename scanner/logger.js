'use strict';
var path = require('path'),
    winston = require('winston'),
    infoLog = path.join(__dirname, '/logs/info.log'),
    errorLog = path.join(__dirname, '/logs/error.log');

var logger = new (winston.Logger)({
    transports: [
        new (winston.transports.Console)({colorize: true}),
        new (winston.transports.File)({ filename: infoLog, name: 'info', level: 'info' }),
        new (winston.transports.File)({ filename: errorLog, name: 'error', level: 'error' })
    ]
});

module.exports = logger;
