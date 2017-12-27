var React = require('react');

var MainArea = require('./mainarea');
var Loader = require('./loader.js');
var Title = require('../title.js');
var PropTypes = require('prop-types');

var ReactCSSTransitionGroup = require('react-addons-css-transition-group');

class Crack extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
        boosterCount: 0,
        boostersOpened: 1,
        imagesLoaded: 0,
        loaded: false,
        loadCard : "",
        loadPercent : 0,

        booster: {
          cards: []
        },

        mainCard: {}
        
      };

      this.nextCard = this.nextCard.bind(this);
      this.generateBooster = this.generateBooster.bind(this);
      this.nextBooster = this.nextBooster.bind(this);
      this.handleImageLoaded = this.handleImageLoaded.bind(this);
    }

    
    
    nextCard() {

        var c = this.state.boosterCount - 1;

        if (c > 0) {
            this.setState({boosterCount: c});
            this.setState({
                mainCard: this.state.booster.cards[c]
            });

        } else if (c === 0) {
            this.setState({boosterCount: c});
            this.setState({
                mainCard: this.state.booster.cards[c]
            });
            
        } else if (c === -1) {
          this.props.toggle();
        }

    }

    handleImageLoaded(response) {

      var c = this.state.imagesLoaded + 1;
      var l = this.state.booster.cards.length;
      var percent = Math.ceil(( c / l ) * 100);

      var loaded = false;
      if (percent === 100) {
        loaded = true;
        percent = 0;
        c = 0;
      };
      
      this.setState({
        loaded: loaded,
        imagesLoaded: c,
        loadPercent: percent
      });

    }

    nextBooster() {

      this.setState({mainCard: {}, loaded: false});
      this.generateBooster(this.props.setCode);
      this.props.updateBoosters();

    }

    generateBooster(set) {

        fetch('https://api.magicthegathering.io/v1/sets/'+set+'/booster').then(function(response) {
            return response.json();
          }).then(function(json) {

            this.setState({booster: json
            });
            this.setState({boosterCount: this.state.booster.cards.length - 1});
            this.setState({
                mainCard: this.state.booster.cards[this.state.boosterCount]
            });

          }.bind(this));

    }
    
    componentWillMount() {
        this.generateBooster(this.props.setCode);
    }
    
    render() {

      return (

        <div className="container-fluid hide-overflow">

          <div className="row">

            <div className="col-md-12 background light">

              <Title/>

              {/* Image Preloader */}

              {this.state.booster.cards.slice(0).reverse().map(function(item, i) {
                return (
                  <img key={i}
                  src={item.imageUrl}
                  className="card__prep"
                  onError={this.handleImageLoaded}
                  onLoad={this.handleImageLoaded}/>
                )
              }.bind(this))} 

              <ReactCSSTransitionGroup
              transitionName="backdrop"
              transitionAppear={true}
              transitionEnter={true}
              transitionLeave={true}
              transitionAppearTimeout={1000}
              transitionLeaveTimeout={1000}
              >

                {!this.state.loaded ? <Loader key={this.state.boostersOpened} loadPercent={this.state.loadPercent}/>
                : <MainArea card={this.state.mainCard}
                  next={this.nextCard}
                  goodClickHandler={this.props.goodClickHandler}
                  badClickHandler={this.props.badClickHandler}
                  boosterCount={this.state.boosterCount}
                  toggle={this.props.toggle}/>
                }

              </ReactCSSTransitionGroup>

            </div>
          </div>
        </div>
      )
    }
}

Crack.propTypes = {

  toggle: PropTypes.func,
  badClickHandler: PropTypes.func,
  goodClickHandler: PropTypes.func,
  setCode: PropTypes.string,
  updateBoosters: PropTypes.func,
  
}

module.exports = Crack;