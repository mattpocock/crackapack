var React = require('react');

var MainArea = require('./mainarea');
var NextBooster = require('./nextbooster');
var Loader = require('./loader.js');

var ReactCSSTransitionGroup = require('react-addons-css-transition-group');

class Crack extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
        setCode: "",
        boosterCount: 0,
        lastCard: false,
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
          this.setState({lastCard: true});
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
            this.setState({booster: json,
                          lastCard: false
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
          <div className="row">
            <h1 className="align-center">Crack A Pack</h1>
            <h4 className="align-center">Got any more of dem packs?</h4>
          </div>
            {this.state.booster.cards.slice(0).reverse().map(function(item, i) {
              return <img key={i} src={item.imageUrl} className="card__prep" onLoad={this.handleImageLoaded}/>;
            }.bind(this))}
            <ReactCSSTransitionGroup
            transitionName="backdrop"
            transitionAppear={true}
            transitionEnter={true}
            transitionLeave={true}
            transitionAppearTimeout={1000}
            transitionLeaveTimeout={1000}
            >
            {!this.state.loaded ? 
            
            
            <Loader key={this.state.boostersOpened} loadPercent={this.state.loadPercent}/>
            
            :
            
              !this.state.lastCard ? <MainArea card={this.state.mainCard}
                next={this.nextCard}
                goodClickHandler={this.props.goodClickHandler}
                badClickHandler={this.props.badClickHandler}
                boosterCount={this.state.boosterCount}
                toggle={this.props.toggle}/> :
              <NextBooster same={this.nextBooster} new={this.props.toggle}/>
              
            }
            </ReactCSSTransitionGroup>
          </div>
        </div>
        </div>
      )
    }
}

module.exports = Crack;