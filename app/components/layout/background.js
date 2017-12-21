var React = require('react');

class Background extends React.Component {
    render() {
        return (
        <div
            className="fixed-backdrop"
            style={{backgroundImage: "url(" + this.props.src + ")"}}/>

        );
    }
}

module.exports = Background;