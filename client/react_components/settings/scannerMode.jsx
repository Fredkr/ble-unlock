'use strict';
var React = require('react');
var ScannerMode = React.createClass({
    propTypes: {
        getSettingSource: React.PropTypes.string.isRequired,
        saveSettingSource: React.PropTypes.string.isRequired
    },
    getInitialState: function() {
        return {
            proximityMode: false
        };
    },
    componentDidMount: function() {

        $.ajax({
            type: 'POST',
            contentType: 'application/json; charset=utf-8',
            url: this.props.getSettingSource,
            data: JSON.stringify({
                type: 'proximityMode',
            }),
            success: function(response){
                if (this.isMounted()) {
                    console.log(response);
                    this.setState({
                        proximityMode: response
                    });
                }
            }.bind(this)
        });
    },
    updateProximityMode: function(newState) {
        $.ajax({
            type: 'POST',
            contentType: 'application/json; charset=utf-8',
            url: this.props.saveSettingSource,
            data: JSON.stringify({
                type: 'proximityMode',
                value: newState
            }),
            success: function(){
                this.setState({
                    proximityMode: newState
                });
            }.bind(this)
        });
    },
    render: function() {
        return (
            <div className="general">
                <h3 className="line"> Proximity Mode </h3>
                <div className="container">
                    <p className="left"> Let the app lock and unlock your computer automatically</p>
                    <div className="center two-column">
                        <form className="pure-radio">Manual mode
                            <input
                                checked={!this.state.proximityMode}
                                className="radio-input"
                                name="optionsRadios"
                                onChange={this.updateProximityMode.bind(this, !this.state.proximityMode)}
                                type="radio"/>
                        </form>
                        <form className="pure-radio">Proximity mode
                            <input
                                checked={this.state.proximityMode}
                                className="radio-input"
                                name="optionsRadios"
                                onChange={this.updateProximityMode.bind(this, !this.state.proximityMode)}
                                type="radio"/>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = ScannerMode;
