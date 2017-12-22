var React = require('react');

var NextBooster = require('./nextbooster.js');
var Card = require('./card.js');
var ReactCSSTransitionGroup = require('react-addons-css-transition-group');

class MainArea extends React.Component {

    constructor(props) {
      super(props);
      
      this.handleGoodClick = this.handleGoodClick.bind(this);
      this.handleBadClick = this.handleBadClick.bind(this);
    }
    
    handleBadClick() {
      this.props.badClickHandler(this.props.card);
      this.props.next();
    }

    handleGoodClick() {
      this.props.goodClickHandler(this.props.card);
      this.props.next();
    }
    
    render() {
      return (
        <div className="container-fluid" style={{overflowY: "hidden"}}>
          <div className="row row-eq-height">
            <div className="col-xs-2 main-area__button__container">
              <button className="main-area__button" onClick={this.handleBadClick}><i class="fa fa-thumbs-down" aria-hidden="true"></i><br/>Discard</button>
            </div>
            <div className="col-xs-8 card__container">
              <ReactCSSTransitionGroup
                transitionEnter={true}
                transitionLeave={true}
                transitionName="fade"> 
                  <Card underCard={this.props.underCard} card={this.props.card} key={this.props.boosterCount}/>
              </ReactCSSTransitionGroup>
            </div>
        <div className="col-xs-2 main-area__button__container">
          <button className="main-area__button" onClick={this.handleGoodClick}><i class="fa fa-thumbs-up" aria-hidden="true"></i><br/>Save</button>
        </div>
      </div>
        <div className="row">
        <div className="col-xs-3 hidden-md"/>
        <ReactCSSTransitionGroup
                transitionEnter={true}
                transitionLeave={true}
                transitionName="fade"> 
          <div key={this.props.card.name} className="col-xs-6 col-md-12">
            <h3 className="fadeInLeft">{this.props.card.name} ({this.props.card.rarity})</h3>
            <h4 className="fadeInLeft">{this.props.card.type}</h4>
            <p className="fadeInLeft">{this.props.card.text}</p>
          </div>
        </ReactCSSTransitionGroup>
        <div className="col-xs-3 hidden-md"/>
        </div>
      </div>
        );
    }
  }

module.exports = MainArea;