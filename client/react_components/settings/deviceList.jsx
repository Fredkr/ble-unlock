'use strict';
var React = require('react');
var DeviceSynchronizer = require('devicesynchronizer');
var DeviceList = React.createClass({
    propTypes: {
        deleteDeviceSource: React.PropTypes.string.isRequired,
        getDeviceSource: React.PropTypes.string.isRequired,
        saveDeviceSource: React.PropTypes.string.isRequired,
        showToastMessage: React.PropTypes.func.isRequired,
        syncSource: React.PropTypes.string.isRequired
    },
    getInitialState: function() {
        return {
            devices: []
        };
    },
    componentDidMount: function() {
        $.ajax({
            type: 'GET',
            contentType: 'application/json; charset=utf-8',
            url: this.props.getDeviceSource,
            success: function(response){
                if (this.isMounted()) {
                    this.setState({
                        devices: response
                    });
                }
            }.bind(this)
        });
    },
    deleteDevice: function(id, index){
        $.ajax({
            type: 'DELETE',
            contentType: 'application/json; charset=utf-8',
            url: this.props.deleteDeviceSource,
            data: JSON.stringify({id: id}),
            success: function(){
                var self = this;
                this.state.devices.splice(index, 1);
                this.setState({
                    devices: self.state.devices
                });
            }.bind(this),
            error: function(){
            }.bind(this)
        });
    },
    saveDevice: function(name, uuid, callback) {
        $.ajax({
            type: 'POST',
            contentType: 'application/json; charset=utf-8',
            url: this.props.saveDeviceSource,
            data: JSON.stringify({
                name: name,
                uuid: uuid
            }),
            success: function(response){
                this.onNewDevice(response);
                return callback({success: true});
            }.bind(this),
            error: function(response){
                return callback({success: false, msg: response.responseText});
            }.bind(this)
        });
    },
    onNewDevice : function(newDevice){
        var newDeviceList = this.state.devices;
        newDeviceList.push(newDevice);
        this.setState({
            devices: newDeviceList
        });
    },
    synchronize: function() {
        console.log('sync');
        React.render( <DeviceSynchronizer
            saveDevice={this.saveDevice}
            showToastMessage={this.props.showToastMessage}
            syncSource={this.props.syncSource}/>
        , document.getElementById('devicesynchronizer'));
    },
    render: function() {
        return (
            <div>
                <h2>Devices</h2>
                <table className="pure-table pure-table-horizontal">
                    <thead>
                        <tr>
                            <th className="col-id">#</th>
                            <th className="col-name">Device</th>
                            <th className="col-uuid">GUID</th>
                            <th className="col-buttons"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.devices.map(function(device, index) {
                            return (<tr>
                                <td className="col-id">{index + 1}</td>
                                <td className="col-name">{device.value.name}</td>
                                <td className="col-uuid">{device.value.uuid}</td>
                                <td className="col-buttons">
                                    <button className="pure-button"
                                        onClick={this.deleteDevice.bind(this, device._id, index)}>
                                        <i className="fa fa-trash-o"></i>
                                    </button>
                                </td>
                            </tr>);
                        }.bind(this))}

                    </tbody>
                </table>
                <button className="pure-button scanner-button"
                    onClick={this.synchronize}>
                    Scan for new device <i className="fa fa-search"></i>
                </button>
            </div>
        );
    }
});

module.exports = DeviceList;
