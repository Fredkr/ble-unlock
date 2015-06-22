var NewDeviceSynchronizer = React.createClass({
    getInitialState: function() {
        return {
            devices: [],
            synchronizing: true,
            error: false
        };
    },  
    componentDidMount: function() {
        document.body.addEventListener('click', this.handleBodyClick);

        $.ajax({
            url: this.props.syncSource,
            type: 'GET',
            error: function(){
                 this.setState({
                    synchronizing: true,
                    error: true,
                });
            }.bind(this),
            success: function(data){
                this.setState({
                    devices: data,
                    synchronizing: false 
                });
            }.bind(this)
        });
    },
    componentWillUnmount: function () {
        document.body.removeEventListener('click', this.handleBodyClick);
    },
    handleBodyClick: function (event) {
        var node = React.findDOMNode(this);
        if (!node.contains(event.target)) {
            React.unmountComponentAtNode(document.getElementById('devicesynchronizer'));
        } 
    },
    reset: function(){
        this.replaceState(this.getInitialState())
        this.componentDidMount();
    },
    render: function (){
        var cx = React.addons.classSet;
        var divClasses = cx({
            'synchronizing': this.state.synchronizing && !this.state.error
        });
        var iconClasses = cx({
            'fa-spin': this.state.synchronizing && !this.state.error,
            'error': this.state.error,
            'fa fa-refresh': true
        });
        
        if(this.state.synchronizing){
            <h2>Devices</h2>
            return <div className="device-synchronizer-container">
                {this.state.error 
                    ? <h2> No devices found </h2>
                    : <h2> Scanning for devices (very) close by </h2>
                }
                <div className={divClasses}>
                    <i className={iconClasses} onClick={this.reset}></i>
                    {this.state.error && 

                        <p> Try again </p>
                    }
                </div>       
            </div>  
        }else {
            return <NewDevicesBox             
                        saveDevice={this.props.saveDevice}
                        showToastMessage={this.props.showToastMessage}
                        devices={this.state.devices} />
        }            
    }
});

var NewDevicesBox = React.createClass({
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
                self.props.showToastMessage("error", result.msg);

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
           return <div className="device-synchronizer-container">
                <h2> We found devices!</h2>      
                <h3>select one and give it a name</h3>
                <table className="pure-table pure-table-horizontal">
                    <thead>
                        <tr>
                            <th>Devices found</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.devices.map(function(result) {
                            var selected = result === this.state.uuid ? 'selected':'';
                            return (<tr>
                                <td className={selected} 
                                    onClick={this.handleChange.bind(this, result, 'uuid')}>{result}
                                </td>
                            </tr>)
                        }.bind(this)
                        )}
                    </tbody>
                </table>
                <h2> Give it a name </h2>
                <div>
                    <input type="text" onChange={this.handleChange.bind(this, null, 'name')} />
                </div>
                <button className="button-xlarge pure-button" disabled={!this.deviceValidToSave()} onClick={this.saveDevice}>Save device</button>
            </div>;
    }
});


