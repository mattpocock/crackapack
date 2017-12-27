var React = require('react');
var PropTypes = require('prop-types');

class Loader extends React.Component {
    render() {
        return (
            <div className="loader__float-div">
                
                <div className="loader__container"/>
                
                <div className="loader__mover__container">
                    <div className="loader__mover" style={{height: Math.ceil((this.props.loadPercent/100)*28) + "em"}}>
                        <h1 className="loader__text">{this.props.loadPercent}%</h1>
                    </div>
                </div>

            </div>
        )
    }
}

Loader.propTypes = {
    loadPercent: PropTypes.int
}

module.exports = Loader;