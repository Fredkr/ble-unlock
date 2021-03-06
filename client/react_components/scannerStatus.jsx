'use strict';
var React = require('react');
var ScannerStatus = React.createClass({
    getInitialState: function() {
        var self = this;
        var isScanning = false;
        $.get('http://localhost:3001/get/scanner-active/')
            .done(function(data) {
                var scanning = JSON.parse(data).active === true;
                self.setState({
                    isScanning: scanning
                });
            }.bind(this));

        return {
            isScanning: isScanning
        };
    },
    toggle: function() {
        var self = this;
        $.get('http://localhost:3001/toggle-scanner/')
            .done(function(data) {
                var scanning = JSON.parse(data).active === true;
                self.setState({
                    isScanning: scanning
                });
            }.bind(this));
    },

    render: function() {
        var classString = this.state.isScanning ? 'scanner-info enabled' : 'scanner-info disabled';
        return (
            <div className='status-container center'>
                <div className={classString}>
                    <p> {this.state.isScanning ? 'Scanning' : 'Turned off'} </p>
                </div>
                <button className='button-xlarge pure-button'
                    onClick={this.toggle}> {this.state.isScanning ? 'Stop' : 'Start'}
                </button>
            </div>
        );
    }
});

module.exports = ScannerStatus;
