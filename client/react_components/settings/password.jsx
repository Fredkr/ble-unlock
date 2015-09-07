'use strict';
var React = require('react');
var Password = React.createClass({
    propTypes: {
        getSettingSource: React.PropTypes.string.isRequired,
        saveSettingSource: React.PropTypes.string.isRequired,
        showToastMessage:  React.PropTypes.func.isRequired,
    },
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
            contentType: 'application/json; charset=utf-8',
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
            contentType: 'application/json; charset=utf-8',
            url: this.props.saveSettingSource,
            data: JSON.stringify({
                type: 'password',
                value: this.state.password,
            }),
            success: function(){
                this.props.showToastMessage('success', 'Password saved');
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
        var description = 'To be able to unlock your computer you need to enter your password here';
        return (
            <div className='general'>
                <h3 className='line'> Password </h3>
                <div className='container'>
                    <p className='left'> {description} </p>
                    <div className='center'>
                        <form>
                            <input
                                className='text-input'
                                onChange={this.handleInputChange.bind(this, 'password')}
                                onFocus={this.onInputFocus}
                                placeholder="password goes here"
                                required
                                type='password'
                                value={!this.state.passwordIsSet || this.state.passwordHaveBeenFocused
                                    ? this.state.password
                                    : this.state.placeHolder}/>
                        </form>
                    </div>
                    <div className="right">
                        <button className="pure-button"
                            onClick={this.savePassword}
                            type="submit" >
                            <i className="fa fa-floppy-o"></i>
                        </button>
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = Password;
