var React = require('react');

var PropTypes = require('prop-types');

class Card extends React.Component {

    render() {
        return (
            <img className="card" src={this.props.card.imageUrl}/>
        )
    }
}

Card.propTypes = {

    card: PropTypes.object
    
}

module.exports = Card;