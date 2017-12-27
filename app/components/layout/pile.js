var React = require('react');
var PropTypes = require('prop-types');

class Pile extends React.Component {
  
    render() {
      return (
        <div className="pile">
        {this.props.data.cards.map(function(item, i) {
            return <div key={i} className="pile__card" style={{backgroundImage: "url(" + item.imageUrl + ")"}}/>;
          })}
        
        
        </div>
      )
    }
  }

Pile.propTypes = {
  data: PropTypes.object
}

module.exports = Pile;