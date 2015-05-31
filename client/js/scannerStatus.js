var ScannerStatus = React.createClass({
    getInitialState: function() {
        var self = this;
        var isScanning = false;
        $.get("http://localhost:3001/scannerActive/")
            .done(function(data) {
                var scanning = JSON.parse(data).active === true;
                self.setState({
                    isScanning: scanning
                });
            }.bind(this));

        return {
            isScanning: isScanning
        };
    },
    toggle: function(event) {
        var self = this;
        $.get("http://localhost:3001/toggleScanner/")
            .done(function(data) {
                var scanning = JSON.parse(data).active === true;
                self.setState({
                    isScanning: scanning
                });
            }.bind(this));
    },

    render: function() {
        var classString = this.state.isScanning ? 'scanner-info scanner-info-enabled' : 'scanner-info scanner-info-disabled';
        return ( 
            <div className="status-container">
                <h1 className={classString}> Status </h1>
                <p> 
                    <button className="button-xlarge pure-button scanner-button" onClick={this.toggle}> {this.state.isScanning ? 'Stop' : 'Start'} </button>
                </p>
            </div>
        );
    }
});

React.render( <ScannerStatus /> ,
    document.getElementById('status')
);