var Settings = React.createClass({

    getInitialState: function() {
        return {
            uuids: []
        };
    },
    componentDidMount: function() {
        $.get(this.props.source, function(result) {
            if (this.isMounted()) {
                this.setState({
                    uuids: result
                });
            }
        }.bind(this));
    },
    render: function() {
        return ( 
            <div className="settings-container">
                <div className="settings-content">
                    <h1> Settings </h1>
                    <h2>Lock</h2>
                    <TableWrapper action="lock" source="http://localhost:3001/get/validDevices/?action=lock" />
                    <button className="button-xlarge pure-button" > Save</button>
                    <h2>Lock</h2>
                    <TableWrapper action="unlock" source="http://localhost:3001/get/validDevices/?action=unlock" />

                </div>
            </div>
        );
    }
});

var TableWrapper = React.createClass({
    getInitialState: function() {
        return {
            uuids: []
        };
    },
    componentDidMount: function() {
        $.get(this.props.source, function(result) {
            if (this.isMounted()) {
                this.setState({
                    uuids: result
                });
            }
        }.bind(this));
    },
    render: function() {
        return (
                <table className="pure-table pure-table-horizontal">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Device</th>
                            <th>GUID</th>
                        </tr>
                    </thead>

                    <tbody>
                        {this.state.uuids.map(function(result) {
                            return <DeviceItemWrapper key={result.id} data={result}/>;
                        })}
                        <NewDeviceItemWrapper action={this.props.action} source="http://localhost:3001/post/addDevice/" />
                    </tbody>
                </table>
                );
    }
});

var NewDeviceItemWrapper = React.createClass({
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
            url: this.props.source,
            data: JSON.stringify({
                    name: this.state.name,
                    uuid: this.state.uuid,
                    action: this.props.action
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
            <td><button className="button-xsmall pure-button" onClick={this.saveDevice}></button></td>
            <td><input type="text" value={this.state.name} onChange={this.handleChange.bind(this, 'name')} /></td>
            <td><input type="text" value={this.state.uuid} onChange={this.handleChange.bind(this, 'uuid')} /></td>
        </tr>;
    }
});
var DeviceItemWrapper = React.createClass({
  render: function() {
    return <tr>
        <td>1</td>
        <td>{this.props.data.name}</td>
        <td>{this.props.data.uuid}</td>
    </tr>;
  }
});

React.render( <Settings /> ,
    document.getElementById('settings')
);
