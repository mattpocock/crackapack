var React = require('react');

var NextBooster = require('./nextbooster');

class MainArea extends React.Component {

    constructor(props) {
      super(props);
      
      this.handleGoodClick = this.handleGoodClick.bind(this);
      this.handleBadClick = this.handleBadClick.bind(this);
    }
    
    handleGoodClick(e) {
      this.props.good();
      this.props.next();
    }
    
    handleBadClick(e) {
      this.props.bad();
      this.props.next();
    }
    
    render() {
      return (
        <div className="container-fluid">
          <div className="row row-eq-height">
            <div className="col-xs-4 dark main-area__button__container">
              <button className="main-area__button" onClick={this.handleBadClick}>Shit Pile</button>
            </div>
            <div className="col-xs-4 darkish card__container">
            <div className="card__under" style={{backgroundImage: "url("+this.props.underCard.imageUrl+")"}}>
              <img className="card" src={this.props.card.imageUrl}/>
            </div>
              
            </div>
        <div className="col-xs-4 dark main-area__button__container">
          <button className="main-area__button" onClick={this.handleGoodClick}>Good Pile</button>
        </div>
      </div>
        <div className="row">
        <div className="col-xs-3 hidden-md"/>
          <div className="col-xs-6 col-md-12 dark">
            <h3 className="fadeInLeft">{this.props.card.name} ({this.props.card.rarity})</h3>
            <h4 className="fadeInLeft">{this.props.card.type}</h4>
            <p className="fadeInLeft">{this.props.card.text}</p>
          </div>
        <div className="col-xs-3 hidden-md"/>
        </div>
      </div>
        );
    }
  }

module.exports = MainArea;