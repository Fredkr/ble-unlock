var Settings = React.createClass({
    showToastMessage: function(type, message){
        React.render(
            <Toast type={type} nodeId="toast" message={message} />,
            document.getElementById('toast'));
    },
    render: function() {
        return ( 
            <div className="settings-container">
                <div id="toast"></div>
                <div className="settings-content">
                    <div className="settings-header">
                        <i className="fa fa-cog fa-spin settings-icon"></i>
                    </div>
                    <GeneralSettings
                        showToastMessage={this.showToastMessage}
                        generalSettingsSource="http://localhost:3001/get/settings/general/"/>
                    
                    <DeviceList
                        showToastMessage={this.showToastMessage}
                        getDeviceSource="http://localhost:3001/get/devices/"
                        deleteDeviceSource="http://localhost:3001/delete/device/"
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