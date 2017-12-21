var React = require('react');

            

class Card extends React.Component {

    render() {
        return (
            <img className="card" src={this.props.card.imageUrl}/>
        )
    }
}

module.exports = Card;