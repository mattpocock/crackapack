var React = require('react');

var MainArea = require('./mainarea');
var NextBooster = require('./nextbooster')

class Crack extends React.Component {
  
    constructor(props) {
      super(props);
      this.state = {
        setCode: "",
        boosterCount: 0,
        lastCard: false,
        boostersOpened: 1,
        booster: {
          cards: []
        },
        mainCard: {},
        underCard: {},
        
      };

      this.nextCard = this.nextCard.bind(this);
      this.generateBooster = this.generateBooster.bind(this);
      this.nextBooster = this.nextBooster.bind(this);
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
                mainCard: this.state.booster.cards[this.state.boosterCount],
                underCard: this.state.booster.cards[this.state.boosterCount - 1]
            });
          }.bind(this));

    }
    
    componentWillMount() {
        this.generateBooster(this.props.setCode);
    }
    
    render() {
      return (
        <div className="container-fluid">
        <div className="row">
          <div className="col-md-12 background light">
          <div className="row">
            <h1 className="align-center">Crack A Pack</h1>
            <h4 className="align-center">Got any more of dem packs?</h4>
          </div>
            {!this.state.lastCard ? <MainArea card={this.state.mainCard}
              underCard={this.state.underCard}
              next={this.nextCard}
              goodClickHandler={this.props.goodClickHandler}
              badClickHandler={this.props.badClickHandler}
              toggle={this.props.toggle}/> :
            <NextBooster same={this.nextBooster} new={this.props.toggle}/>
            }
          </div>
        </div>
        </div>
      )
    }
}

module.exports = Crack;