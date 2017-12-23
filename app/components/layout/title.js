var React = require('react');

class Title extends React.Component {
    render() {
        return (
            <div className="row title">
            <h1 className="">Crack A Pack</h1>
            <h4 className="">Guilt-Free Cardboard Crack</h4>
            {this.props.chooseBooster && <div><h2 className="align-center">Choose A Booster</h2><hr/></div>}
          </div>
        )
    }
}

module.exports = Title;