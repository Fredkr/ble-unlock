'use strict';
var React = require('react');
var NewDeviceResult = React.createClass({
    propTypes: {
        devices: React.PropTypes.object.isRequired,
        onNewDevice: React.PropTypes.func.isRequired,
        showToastMessage: React.PropTypes.func.isRequired
    },
    getInitialState: function() {
        return {
            uuid: '',
            name: ''
        };
    },
    updateDeviceList: function(newDevice) {
        this.props.onNewDevice(newDevice);
    },
    saveDevice: function() {
        var self = this;
        self.props.saveDevice(self.state.name, self.state.uuid, function(result){
            if(result.success){
                React.unmountComponentAtNode(document.getElementById('devicesynchronizer'));
            }else {
                self.props.showToastMessage('error', result.msg);
            }
        });
    },
    deviceValidToSave: function(){
        if(this.state.uuid !== '' && this.state.name !== ''){
            return true;
        }
        return false;
    },
    handleChange: function (value, name, e) {
        var change = {};
        change[name] = value !== null ? value : e.target.value;
        this.setState(change);
    },
    render: function() {
            return (<div className='device-synchronizer-container'>
                <h2> We found devices!</h2>
                <h3>select one and give it a name</h3>
                <table className='pure-table pure-table-horizontal'>
                    <thead>
                        <tr><th>Devices found</th></tr>
                    </thead>
                    <tbody>
                        {this.props.devices.map(function(result) {
                            var selected = result === this.state.uuid ? 'selected' : '';
                            return (<tr>
                                <td className={selected}
                                    onClick={this.handleChange.bind(this, result, 'uuid')}>{result}
                                </td>
                            </tr>);
                        }.bind(this)
                        )}
                    </tbody>
                </table>
                <h2> Give it a name </h2>
                <div>
                    <input
                        onChange={this.handleChange.bind(this, null, 'name')}
                        type='text' />
                </div>
                <button className='button-xlarge pure-button'
                    disabled={!this.deviceValidToSave()}
                    onClick={this.saveDevice}>Save device</button>
            </div>);
        }
});

module.exports = NewDeviceResult;
