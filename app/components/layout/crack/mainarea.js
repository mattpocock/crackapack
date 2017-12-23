var React = require('react');

var Card = require('./card.js');
var ReactCSSTransitionGroup = require('react-addons-css-transition-group');

class MainArea extends React.Component {

    constructor(props) {
      super(props);

      this.state = {
        lastClick: "good"
      }
      
      this.handleGoodClick = this.handleGoodClick.bind(this);
      this.handleBadClick = this.handleBadClick.bind(this);
    }
    
    handleBadClick() {
      this.props.badClickHandler(this.props.card);
      this.setState({lastClick: "bad"});
      this.props.next();
    }

    handleGoodClick() {
      this.props.goodClickHandler(this.props.card);
      this.setState({lastClick: "good"});
      this.props.next();
    }
    
    render() {
      return (
        <div className="container-fluid hide-overflow">}>
          <div className="row row-eq-height">
            <div className="col-xs-2 main-area__button__container">
              <button className="main-area__button" onClick={this.handleBadClick}><i className="fa fa-thumbs-down" aria-hidden="true"></i><br/>Discard</button>
            </div>
            <div className="col-xs-8 card__container">
              <ReactCSSTransitionGroup
                transitionEnter={true}
                transitionLeave={true}
                transitionName={this.state.lastClick === "bad" ? "bad-card" : "good-card"}>
                  <Card underCard={this.props.underCard} card={this.props.card} key={this.props.boosterCount}/>
              </ReactCSSTransitionGroup>
            </div>
        <div className="col-xs-2 main-area__button__container">
          <button className="main-area__button" onClick={this.handleGoodClick}><i className="fa fa-thumbs-up" aria-hidden="true"></i><br/>Save</button>
        </div>
      </div>
        <div className="row">
        <div className="col-xs-3 hidden-md"/>
        <ReactCSSTransitionGroup
                transitionEnter={true}
                transitionLeave={true}
                transitionName="fade"> 
          <div key={this.props.card.name} className="col-xs-6 col-md-12 main-area__descbox">
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