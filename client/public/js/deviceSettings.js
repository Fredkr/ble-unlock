var DeviceList = React.createClass({
    getInitialState: function() {
        return {
            devices: []
        };
    },
    componentDidMount: function() {
        $.get(this.props.getDeviceSource, function(result) {
            if (this.isMounted()) {
                this.setState({
                    devices: result
                });
            }
        }.bind(this));
    },
    deleteDevice: function(id, index, e){
        $.ajax({
            type: 'DELETE',
            contentType: "application/json; charset=utf-8",
            url: this.props.deleteDeviceSource,
            data: JSON.stringify({id: id}),
            success: function(response){
                var self = this;
                this.state.devices.splice(index, 1);
                this.setState({
                    devices: self.state.devices
                });
            }.bind(this)
        });
    },
    onNewDevice : function(newDevice){
        var newDeviceList = this.state.devices.slice();    
        newDeviceList.push(newDevice);   
        this.setState({
            devices:newDeviceList
        })
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
                                    <button className="pure-button" onClick={this.deleteDevice.bind(this, device._id, index)}>
                                        <i className="fa fa-trash-o"></i>
                                    </button>
                                </td>
                            </tr>)
                        }.bind(this))}
                        <NewDeviceItem 
                            onNewDevice={this.onNewDevice}
                            saveDeviceSource={this.props.saveDeviceSource} />
                    </tbody>
                </table>
                <NewDeviceSynchronizerButton 
                    onNewDevice={this.onNewDevice}
                    syncSource={this.props.syncSource}
                    saveDeviceSource={this.props.saveDeviceSource} />
            </div>
        );
    }
});

var NewDeviceSynchronizerButton = React.createClass({
    synchronize: function() {
        React.render( <NewDeviceSynchronizer 
            onNewDevice={this.props.onNewDevice}
            syncSource={this.props.syncSource} 
            saveDeviceSource={this.props.saveDeviceSource} />
            , document.getElementById('devicesynchronizer'));
    },
    render: function() {

        return <button className="pure-button scanner-button" onClick={this.synchronize}>
            Scan for new device   <i className="fa fa-search"></i>
        </button>;
    }
});

var NewDeviceItem = React.createClass({
    getInitialState: function() {
        return {
            name: '',
            uuid: ''
        };
    },
    updateDeviceList: function(newDevice) {
        this.props.onNewDevice(newDevice);
    },
    saveDevice: function() {
        $.ajax({
            type: 'POST',
            contentType: "application/json; charset=utf-8",
            url: this.props.saveDeviceSource,
            data: JSON.stringify({
                    name: this.state.name,
                    uuid: this.state.uuid
            }),
            success: function(response){
                this.updateDeviceList(response);
                this.replaceState(this.getInitialState())
            }.bind(this)
        });
    },
    handleChange: function (name, e) {
        var change = {};
        change[name] = e.target.value;
        this.setState(change);
    },
    render: function() {
        return <tr>
            <td className="col-id">?</td>
            <td className="col-name"><input type="text" value={this.state.name} onChange={this.handleChange.bind(this, 'name')} /></td>
            <td className="col-uuid"><input type="text" value={this.state.uuid} onChange={this.handleChange.bind(this, 'uuid')} /></td>
            <td className="col-buttons"><button className="button-xsmall pure-button" onClick={this.saveDevice}><i className="fa fa-floppy-o"></i></button></td>
        </tr>;
    }
});
