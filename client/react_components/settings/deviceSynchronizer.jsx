'use strict';
var React = require('react/addons');
var NewDeviceResult = require('newDeviceResult');

var DeviceSynchronizer = React.createClass({
    propTypes: {
        saveDevice: React.PropTypes.func.isRequired,
        showToastMessage: React.PropTypes.func.isRequired,
        syncSource: React.PropTypes.string.isRequired
    },
    getInitialState: function() {
        console.log('test');

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
        this.replaceState(this.getInitialState());
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

        if(this.state.synchronizing) {
            return(
            <div>
                <div className='device-synchronizer-container'>
                    {this.state.error
                        ? <h2> No devices found </h2>
                        : <h2> Scanning for devices (very) close by </h2>
                    }
                    <div className={divClasses}>
                        <i className={iconClasses}
                            onClick={this.reset}></i>
                        {this.state.error &&

                            <p> Try again </p>
                        }
                    </div>
                </div>
        </div>
        ); }else {
            return (<NewDeviceResult
                devices={this.state.devices}
                saveDevice={this.props.saveDevice}
                showToastMessage={this.props.showToastMessage} />
                ); }
    }
});

module.exports = DeviceSynchronizer;
