var React = require('react');

class Loader extends React.Component {
    render() {
        return (
        <div className="container-fluid">
          <div className="row row-eq-height">
            <div className="col-xs-2 main-area__button__container">
            </div>
            <div className="col-xs-8 card__container">
              <div className="loader__container">
                <h1 className="loader__text">{this.props.loadPercent}%</h1>
                <div className="loader__mover" style={{height: this.props.loadPercent + "%"}}>
                <h1 className="loader__text">{this.props.loadPercent}%</h1>
                </div>
              </div>
            </div>
            <div className="col-xs-2 main-area__button__container">
            </div>
        </div>
      </div>
        )
    }
}

module.exports = Loader;