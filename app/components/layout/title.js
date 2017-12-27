var React = require('react');
var PropTypes = require('prop-types');

class Title extends React.Component {
    render() {
        return (
            <div>
                <div className="row title hidden-md hidden-sm hidden-xs">
                <h1 className="">Crack A Pack</h1>
                <h4 className="">Guilt-Free Cardboard Crack</h4>
                {this.props.chooseBooster &&
                    <div className="title__choose-booster">
                        <hr/>
                        <h2 className="align-center">Choose A Booster</h2>
                        <hr/>
                    </div>
                }
                </div>
                <div className="row title__mobile hidden-lg hidden-xl">
                <h1 className="">Crack A Pack</h1>
                <h4 className="">Guilt-Free Cardboard Crack</h4>
                {this.props.chooseBooster &&
                    <div className="title__mobile__choose-booster">
                        <hr/>
                        <h2 className="align-center">Choose A Booster</h2>
                        <hr/>
                    </div>
                }
                </div>
            </div>
        )
    }
}

Title.propTypes = {
    chooseBooster: PropTypes.bool
}

module.exports = Title;