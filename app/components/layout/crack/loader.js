var React = require('react');

class Loader extends React.Component {
    render() {
        return (
        <div className="loader__float-div">
              <div className="loader__container">
                <h1 className="loader__text">{this.props.loadPercent}%</h1>
                <div className="loader__mover" style={{height: this.props.loadPercent + "%"}}>
                <h1 className="loader__text">{this.props.loadPercent}%</h1>
                </div>
              </div>
        </div>
        )
    }
}

module.exports = Loader;