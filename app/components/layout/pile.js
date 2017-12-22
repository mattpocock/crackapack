var React = require('react');

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

module.exports = Pile;