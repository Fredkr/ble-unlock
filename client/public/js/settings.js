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
                    <div className="settings-header">
                        <i className="fa fa-cog fa-spin settings-icon"></i>
                    </div>
                    <h2>Devices</h2>
                    <DeviceList 
                        getDeviceSource="http://localhost:3001/get/devices/"
                        syncSource="http://localhost:3001/get/new-devices/"
                        saveDeviceSource="http://localhost:3001/post/device/" />
                </div>
            </div>
        );
    }
});

React.render( <Settings /> ,
    document.getElementById('settings')
);