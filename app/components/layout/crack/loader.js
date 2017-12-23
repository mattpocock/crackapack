var React = require('react');

class Loader extends React.Component {
    render() {
        return (
        <div className="loader__float-div">
              <div className="loader__container">
              </div>
              <div className="loader__mover__container">
              <div className="loader__mover" style={{height: Math.ceil((this.props.loadPercent/100)*28) + "em"}}>
                <h1 className="loader__text">{this.props.loadPercent}%</h1>
                </div>
              </div>
        </div>
        )
    }
}

module.exports = Loader;