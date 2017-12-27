var React = require('react');
var PropTypes = require('prop-types');

class Background extends React.Component {
    render() {
        return (
        <div
            className="fixed-backdrop"
            style={{backgroundImage: "url(" + this.props.src + ")"}}/>

        );
    }
}

Background.propTypes = {
    src: PropTypes.string
}

module.exports = Background;