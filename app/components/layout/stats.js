var React = require('react');
var PropTypes = require('prop-types');

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

Stats.propTypes = {
    boostersOpened: PropTypes.int,
    goodPulls: PropTypes.int,
    badPulls: PropTypes.int
}

module.exports = Stats;