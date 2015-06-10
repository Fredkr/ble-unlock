var DeviceList = React.createClass({
    getInitialState: function() {
        return {
            uuids: []
        };
    },
    componentDidMount: function() {
        $.get(this.props.getDeviceSource, function(result) {
            if (this.isMounted()) {
                this.setState({
                    uuids: result
                });
            }
        }.bind(this));
    },
    render: function() {
        return (
            <div>      
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
                        {this.state.uuids.map(function(result, id) {

                            return (<tr>
                                <td className="col-id">{id + 1}</td>
                                <td className="col-name">{result.name}</td>
                                <td className="col-uuid">{result.uuid}</td>
                                <td className="col-buttons">
                                    <button className="button-xsmall pure-button"><i className="fa fa-pencil"></i></button>
                                    <button className="button-xsmall pure-button"><i className="fa fa-trash-o"></i></button>
                                </td>
                            </tr>)
                        })}
                        <NewDeviceItem saveDeviceSource={this.props.saveDeviceSource} />
                    </tbody>
                </table>
                <NewDeviceSynchronizerButton 
                    syncSource={this.props.syncSource}
                    saveDeviceSource={this.props.saveDeviceSource} />
            </div>
        );
    }
});

var NewDeviceSynchronizerButton = React.createClass({
    synchronize: function() {
        React.render( <NewDeviceSynchronizer 
            syncSource={this.props.syncSource} 
            saveDeviceSource={this.props.saveDeviceSource} />
            , document.getElementById('devicesynchronizer'));
    },
    render: function() {

        return <button className="button pure-button scanner-button" onClick={this.synchronize}>
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
    saveDevice: function() {
        $.ajax({
            type: 'POST',
            contentType: "application/json; charset=utf-8",
            url: this.props.saveDeviceSource,
            data: JSON.stringify({
                    name: this.state.name,
                    uuid: this.state.uuid
            }),
            success: function(msg){
                console.log( msg);
            }
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
            <td className="col-save"><button className="button-xsmall pure-button" onClick={this.saveDevice}><i className="fa fa-floppy-o"></i></button></td>
        </tr>;
    }
});
