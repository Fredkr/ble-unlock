'use strict';
var React = require('react');
var Password = require('password');
var ScannerMode = require('scannerMode');

var ScannerSettings = React.createClass({
    propTypes: {
        generalSettingsSource: React.PropTypes.string.isRequired,
        saveSettingSource: React.PropTypes.string.isRequired,
        showToastMessage:  React.PropTypes.func.isRequired,
    },
    getInitialState: function () {
        return {
            settings: []
        };
    },
    componentDidMount: function () {
        $.get(this.props.generalSettingsSource, function (result) {
            this.onMount(function callback() {
                this.setState({
                    settings: result
                });
            });
        }.bind(this));
    },
    getSetting: function (type) {
        var i;
        for (i = 0; i < this.state.settings.length; i++) {
            if (this.state.settings[i].type === type) {
                return this.state.settings[i].value;
            }
        }
    },
    render: function () {
        return (
            <div className='settings-general-container'>
            <Password
                getSettingSource='http://localhost:3001/get/setting/'
                saveSettingSource='http://localhost:3001/post/setting/'
                showToastMessage={this.props.showToastMessage}/>
            <ScannerMode
                getSettingSource='http://localhost:3001/get/setting/'
                saveSettingSource='http://localhost:3001/post/setting/'/>
            </div>
        );
    }
});

module.exports = ScannerSettings;
