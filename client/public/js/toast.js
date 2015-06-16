var Toast = React.createClass({
    componentDidMount: function() {
        var self = this;
        setTimeout(function() {
            React.unmountComponentAtNode(
                document.getElementById(self.props.nodeId))
        }, 3000);

    },
    render: function() {
        var cx = React.addons.classSet;
        var style = cx({
            'toast': true,
            'error': this.props.type === 'error',
            'success': this.props.type === 'success'
        });
        return ( 
            <div className={style}>
                <h4> {this.props.message} </h4>
            </div>
        );
    }
});
