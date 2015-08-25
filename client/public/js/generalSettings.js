var GeneralSettings = React.createClass({

    getInitialState: function() {
        return {
            settings: []
        };
    },
    getSetting: function(type) {
        for (var i=0, length=this.state.settings.length; i<length; i++) {
            if (this.state.settings[i].type === type){
                return this.state.settings[i].value;
            }
        }
    },
    componentDidMount: function() {
        $.get(this.props.generalSettingsSource, function(result) {
            if (this.isMounted()) {
                this.setState({
                    settings: result
                });
            }
        }.bind(this));
    },
    render: function() {
        return (
            <div className="settings-general-container">
            <Password
                showToastMessage={this.props.showToastMessage}
                saveSettingSource="http://localhost:3001/post/setting/"
                getSettingSource="http://localhost:3001/get/setting/"/>
            <ScannerMode
                saveSettingSource="http://localhost:3001/post/setting/"
                getSettingSource="http://localhost:3001/get/setting/"/>
            </div>

        );
    }
});
var ScannerMode = React.createClass({

    getInitialState: function() {
        return {
            proximityMode: false
        };
    },
    componentDidMount: function() {

        $.ajax({
            type: 'POST',
            contentType: "application/json; charset=utf-8",
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
            contentType: "application/json; charset=utf-8",
            url: this.props.saveSettingSource,
            data: JSON.stringify({
                    type: 'proximityMode',
                    value: this.state.proximityMode
            }),
            success: function(response){
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
                            <input className="radio-input" type="radio" name="optionsRadios"
                            checked={!this.state.proximityMode}
                            onChange={this.updateProximityMode.bind(this, false)}/>
                        </form>

                        <form className="pure-radio">Proximity mode
                            <input className="radio-input" type="radio" name="optionsRadios"
                            checked={this.state.proximityMode}
                            onChange={this.updateProximityMode.bind(this, true)}/>
                        </form>
                    </div>
                    <div className="right">

                    </div>
                </div>
            </div>
        );
    }
});
var Password = React.createClass({

    getInitialState: function() {
        return {
            password: '',
            placeHolder: 'plchldr',
            passwordHaveBeenFocused: false,
            passwordIsSet: false
        };
    },
    componentDidMount: function() {
        $.ajax({
            type: 'POST',
            contentType: "application/json; charset=utf-8",
            url: this.props.getSettingSource,
            data: JSON.stringify({
                    type: 'password',
            }),
            success: function(response){
                if (this.isMounted()) {
                    this.setState({
                        passwordIsSet: response
                    });
                }
            }.bind(this)
        });
    },
    savePassword: function() {
        $.ajax({
            type: 'POST',
            contentType: "application/json; charset=utf-8",
            url: this.props.saveSettingSource,
            data: JSON.stringify({
                    type: 'password',
                    value: this.state.password,
            }),
            success: function(response){
                this.props.showToastMessage("success", "Password saved");
            }.bind(this)
        });
    },
    onInputFocus: function() {
        if(!this.state.passwordHaveBeenFocused){
            this.setState({
                passwordHaveBeenFocused: true
            });
        }
    },
    handleInputChange: function (name, e) {
        var change = {};
        change[name] = e.target.value;
        this.setState(change);
    },
    render: function() {
        return (
            <div className="general">
                <h3 className="line"> Password </h3>
                <div className="container">
                    <p className="left"> To be able to unlock your computer you need to enter your password here</p>
                    <div className="center">
                        <form>
                            <input className="text-input" type="password" placeholder="password goes here" onFocus={this.onInputFocus}
                                value={!this.state.passwordIsSet || this.state.passwordHaveBeenFocused
                                    ? this.state.password
                                    : this.state.placeHolder}
                                onChange={this.handleInputChange.bind(this, 'password')}  required/>
                        </form>
                    </div>
                    <div className="right">
                        <button className="pure-button" onClick={this.savePassword} type="submit" >
                            <i className="fa fa-floppy-o"></i>
                        </button>
                    </div>
                </div>
            </div>
        );
    }
});
