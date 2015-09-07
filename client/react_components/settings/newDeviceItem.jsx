'use strict';
var React = require('react');
var NewDeviceItem = React.createClass({
    getInitialState: function() {
        return {
            name: '',
            uuid: ''
        };
    },
    saveDevice: function() {
        var self = this;
        self.props.saveDevice(self.state.name, self.state.uuid, function(result){
            if(result.success){
                self.replaceState(self.getInitialState());
            }else {
                self.props.showToastMessage('error', result.msg);
            }
        });
    },
    handleChange: function (name, e) {
        var change = {};
        change[name] = e.target.value;
        this.setState(change);
    },
    render: function() {
        return (<tr>
                    <td className="col-id">?</td>
                    <td className="col-name">
                        <input
                            onChange={this.handleChange.bind(this, 'name')}
                            type="text"
                            value={this.state.name} />
                    </td>
                    <td className="col-uuid">
                        <input
                            onChange={this.handleChange.bind(this, 'uuid')}
                            type="text"
                            value={this.state.uuid} />
                    </td>
                    <td className="col-buttons">
                        <button className="button-xsmall pure-button"
                            onClick={this.saveDevice}>
                            <i className="fa fa-floppy-o"></i>
                        </button>
                    </td>
            </tr>);
    }
});

module.exports = NewDeviceItem;
