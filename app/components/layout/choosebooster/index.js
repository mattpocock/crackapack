var React = require('react');

var BoosterSelection = require('./boosterselection');
var Title = require('../title.js');
var PropTypes = require('prop-types');

class ChooseBooster extends React.Component {

    constructor(props) {
        super(props);
        this.state = {backgroundImage: ""};
    }

    changeBackground(url) {
        this.setState({backgroundImage: url});

    }

    render() {
        return (
            <div className="col-md-12 background light">
                <Title chooseBooster={true}/>
                <BoosterSelection toggleSet={this.props.toggleSet} toggleMode={this.props.toggleMode}/>
            </div>
        );
    }
}

ChooseBooster.propTypes = {
    toggleSet: PropTypes.func,
    toggleMode: PropTypes.func
}

module.exports = ChooseBooster;