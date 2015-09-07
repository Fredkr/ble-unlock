'use strict';
var React = require('react');
var Settings = require('settings');
var ScannerStatus = require('scannerStatus');

React.render( <Settings />,
    document.getElementById('settings')
);
React.render( <ScannerStatus />,
    document.getElementById('status')
);
