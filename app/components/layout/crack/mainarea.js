var React = require('react');

var Card = require('./card.js');
var ReactCSSTransitionGroup = require('react-addons-css-transition-group');
var ReactTouchEvents = require("react-touch-events");
var PropTypes = require('prop-types');

class MainArea extends React.Component {

    constructor(props) {
      super(props);

      this.state = {
        lastClick: "good"
      }
      
      this.handleGoodClick = this.handleGoodClick.bind(this);
      this.handleBadClick = this.handleBadClick.bind(this);
      this.handleSwipe = this.handleSwipe.bind(this);

    }
    
    // Passes the badclick to the parent
    handleBadClick() {

      this.props.badClickHandler(this.props.card);
      this.setState({lastClick: "bad"});
      this.props.next();

    }

    // Passes the goodclick to the parent
    handleGoodClick() {

      this.props.goodClickHandler(this.props.card);
      this.setState({lastClick: "good"});
      this.props.next();

    }
    
    // Handles a swipe passed to it from ReactTouchEvents
    handleSwipe (direction) {
    
      switch (direction) {
          case "left":
          this.handleBadClick();
          break;

          case "bottom":
          this.handleBadClick();
          break;

          case "right":
          this.handleGoodClick();
          break;

          case "top":
          this.handleGoodClick();
          break;
      }
    }
    
    render() {
      return (
        <div className="container-fluid hide-overflow">
          
          <ReactTouchEvents
              onSwipe={this.handleSwipe}
              >

            <div className="row row-eq-height">

              <div className="col-xs-2 main-area__button__container">
                <button className="main-area__button"
                  onClick={this.handleBadClick}>
                  <i className="fa fa-thumbs-down" aria-hidden="true"></i>
                </button>
              </div>

              <div className="col-xs-8 card__container">
                <ReactCSSTransitionGroup
                  transitionEnter={true}
                  transitionLeave={true}
                  transitionName={this.state.lastClick === "bad"
                  ?
                  "bad-card"
                  :
                  "good-card"}>
                    <Card card={this.props.card} key={this.props.boosterCount}/>
                </ReactCSSTransitionGroup>
              </div>

          <div className="col-xs-2 main-area__button__container">
            <button className="main-area__button"
                onClick={this.handleGoodClick}>
              <i className="fa fa-thumbs-up" aria-hidden="true"></i>
            </button>
          </div>

          </div>
          </ReactTouchEvents>

        <div className="row">
          
          <ReactCSSTransitionGroup
                  transitionEnter={true}
                  transitionLeave={true}
                  transitionName="fade"> 

            <div key={this.props.card.name} className="col-xs-12 main-area__descbox">
              <h3 className="fadeInLeft">{this.props.card.name} ({this.props.card.rarity})</h3>
              <h4 className="fadeInLeft">{this.props.card.type}</h4>
              <p className="fadeInLeft hidden-sm hidden-xs">{this.props.card.text}</p>
            </div>

          </ReactCSSTransitionGroup>

        </div>
      </div>
        );
    }
  }

MainArea.propTypes = {

  card: PropTypes.object,
  boosterCount: PropTypes.int,
  next: PropTypes.func,
  badClickHandler: PropTypes.func,
  goodClickHandler: PropTypes.func
}

module.exports = MainArea;