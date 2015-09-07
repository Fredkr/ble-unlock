'use strict';
var React = require('react');
var ScannerSettings = require('scannerSettings');
var DeviceList = require('deviceList');
var Toast = require('toast');

var Settings = React.createClass({
    showToastMessage: function(type, message){
        React.render(
            <Toast
                message={message}
                nodeId='toast'
                type={type}/>,
            document.getElementById('toast'));
    },
    render: function() {
        return (
            <div className='settings-container'>
                <div id='toast'></div>
                <div className='settings-content'>
                    <div className='settings-header'>
                        <i className='fa fa-cog fa-spin settings-icon'></i>
                    </div>
                    <ScannerSettings
                        generalSettingsSource='http://localhost:3001/get/settings/general/'
                        saveSettingSource='http://localhost:3001/post/device/'
                        showToastMessage={this.showToastMessage}/>

                    <DeviceList
                        deleteDeviceSource='http://localhost:3001/delete/device/'
                        getDeviceSource='http://localhost:3001/get/devices/'
                        saveDeviceSource='http://localhost:3001/post/device/'
                        showToastMessage={this.showToastMessage}
                        syncSource='http://localhost:3001/get/new-devices/'/>
                </div>
            </div>
        );
    }
});

module.exports = Settings;
