var React = require('react');

var MainArea = require('./mainarea');
var Pile = require('./pile');
var NextBooster = require('./nextbooster')

class Crack extends React.Component {
  
    constructor(props) {
      super(props);
      this.state = {
        setCode: "",
        boosterCount: 0,
        lastCard: false,
        booster: {
          cards: []
        },
        mainCard: {},
        underCard: {},
        goodPile: {
          cards: []
        },
        badPile: {
          cards: []
        }
      };
      
      this.handleGoodClick = this.handleGoodClick.bind(this);
      this.handleBadClick = this.handleBadClick.bind(this);
      this.nextCard = this.nextCard.bind(this);
      this.generateBooster = this.generateBooster.bind(this);
      this.nextBooster = this.nextBooster.bind(this);
      this.preparePiles = this.preparePiles.bind(this);
    }
    
    nextCard() {
        var c = this.state.boosterCount - 1;

        if (c > 0) {
            this.setState({boosterCount: c});
            this.setState({
                mainCard: this.state.booster.cards[c],
                underCard: this.state.booster.cards[c-1]
            });
        } else if (c === 0) {
            this.setState({boosterCount: c});
            this.setState({
                mainCard: this.state.booster.cards[c],
                underCard: {}
            });
            
        } else if (c === -1) {
          this.setState({lastCard: true});
        }
    }

    nextBooster() {
      this.generateBooster(this.props.setCode);
    }
    
    handleGoodClick(e) {
      var card = this.state.mainCard;
        var arr = this.state.goodPile.cards;
        arr.push(card);
        if (arr.length > 16) {
          arr.splice(0,1);
        }
        this.setState({goodPile : {
          cards: arr
        }});
    }
    
    handleBadClick(e) {
      var card = this.state.mainCard;
        var arr = this.state.badPile.cards;
        arr.push(card);
      if (arr.length > 16) {
          arr.splice(0,1);
        }
        this.setState({badPile : {
          cards: arr
        }});
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
                mainCard: this.state.booster.cards[this.state.boosterCount],
                underCard: this.state.booster.cards[this.state.boosterCount - 1]
            });
          }.bind(this));
    }

    preparePiles() {
      var goodPile = this.props.goodPile || {};
      if (goodPile === undefined) {goodPile = {cards: []}};
      var badPile = this.props.badPile || {};
      if (badPile === undefined) {badPile = {cards: []}};
      this.setState({goodPile: goodPile, badPile: badPile});
      console.log(goodPile);
      console.log(badPile);
    }
    
    componentWillMount() {
        this.generateBooster(this.props.setCode);
        this.preparePiles();
    }
    
    render() {
      return (
        <div className="container-fluid">
        <div className="row">
          <div className="col-md-1 background hidden-sm hidden-xs dark"/>
          <div className="col-md-2 background hidden-sm hidden-xs darkish pileColumn">
            <Pile data={this.state.badPile}/>
          </div>
          <div className="col-md-6 background light">
          <div className="row">
            <h1 className="align-center">Crack A Pack</h1>
            <h4 className="align-center">Got any more of dem packs?</h4>
          </div>
            {!this.state.lastCard ? <MainArea card={this.state.mainCard}
              underCard={this.state.underCard}
              next={this.nextCard}
              good={this.handleGoodClick}
              bad={this.handleBadClick}
              toggle={this.props.toggle}/> :
            <NextBooster same={this.nextBooster} new={this.props.toggle}/>
            }
          </div>
          <div className="col-md-2 background hidden-sm hidden-xs darkish pileColumn">
            <Pile data={this.state.goodPile}/>
          </div>
          <div className="col-md-1 background hidden-sm hidden-xs dark"/>
        </div>
        </div>
      )
    }
}

module.exports = Crack;