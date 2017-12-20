var React = require('react');

class NextBooster extends React.Component {
    render() {
        return (
            <div className="container-fluid">
                <div className="row row-eq-height">
            <div className="col-xs-4 dark">
            </div>
            <div className="col-xs-4 darkish">
                <button onClick={this.props.same}>Same again?</button>
                <button onClick={this.props.new}>Different Booster?</button>
            </div>
            <div className="col-xs-4 dark"/>
            </div>
            </div>
        );
    }
}

module.exports = NextBooster;