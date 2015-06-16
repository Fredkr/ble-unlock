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
                saveSettingSource="http://localhost:3001/post/setting/"
                eixtingPasswordSource="http://localhost:3001/get/settings/password-is-set"/>
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
            passwordIsSet: false, 
            displayToast: false
        };
    },
    componentDidMount: function() {
        $.get(this.props.eixtingPasswordSource, function(result) {
            if (this.isMounted()) {
                this.setState({
                    passwordIsSet: result 
                });
            }
        }.bind(this));
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
                this.showToastMessage("success", "Password saved");
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
    showToastMessage: function(type, message){

        React.render(
            <Toast type={type} nodeId="toast" message={message} />,
            document.getElementById('toast'));
    },
    handleInputChange: function (name, e) {
        var change = {};
        change[name] = e.target.value;
        this.setState(change);
    },
    render: function() {
        return ( 
            <div className="general">
                <div id="toast"></div>
                <h3 className="line"> Password </h3>
                <div className="container">
                    <p className="left"> To be able to unlock your computer you need to enter your password here</p>
                    <div className="center">
                        <form>
                            <input type="password" placeholder="password goes here" onFocus={this.onInputFocus}
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