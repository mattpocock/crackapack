var React = require('react');

class Stats extends React.Component {

    render() {
        return (
            <div className="stat-box">
            <p>Boosters Opened: {this.props.boostersOpened}</p>
            <p>Good Pulls: {this.props.goodPulls}</p>
            <p>Bad Pulls: {this.props.badPulls}</p>
            </div>
        );
    }
}

module.exports = Stats;