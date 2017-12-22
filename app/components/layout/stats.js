var React = require('react');

class Stats extends React.Component {

    render() {
        return (
            this.props.boostersOpened > 0 &&
            <div className="stat-box">
            <p>Boosters Opened: {this.props.boostersOpened}</p>
            <p>Saved: {this.props.goodPulls}</p>
            <p>Discarded: {this.props.badPulls}</p>
            </div>
            
        );
    }
}

module.exports = Stats;