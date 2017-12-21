var React = require('react');

var Crack = require('./crack');
var ChooseBooster = require('./choosebooster');
var Pile = require('./pile.js');
var Background = require('./background.js');
var Stats = require('./stats.js');

var ReactCSSTransitionGroup = require('react-addons-css-transition-group');

class Layout extends React.Component {
  
    constructor(props) {
      super(props);
      this.state = {
        setCode: "MM3",
        chooseBooster: true,
        boostersOpened: 0,
        goodPulls: 0,
        badPulls: 0,
        backgroundImage : "",
        defaultBackground : "https://magic.wizards.com/sites/mtg/files/RE8hXiBUA9.jpg",
        goodPile: {
            cards: []
        },
        badPile: {
            cards: []
        }
      };

      this.toggleMode = this.toggleMode.bind(this);
      this.toggleSetCode = this.toggleSetCode.bind(this);
      this.handleBadClick = this.handleBadClick.bind(this);
      this.handleGoodClick = this.handleGoodClick.bind(this);
      this.updateBoosterCount = this.updateBoosterCount.bind(this);
    }

    updateBoosterCount() {
        this.setState({boostersOpened: this.state.boostersOpened+1});
        console.log(this.state.boostersOpened + " boosters opened!");
    }

    toggleMode(good, bad) {
        this.state.chooseBooster ? this.setState({chooseBooster : false}) : this.setState({chooseBooster: true});
        this.updateBoosterCount();
    }

    toggleSetCode(code) {
        this.setState({setCode: code});
        this.changeBackground(code);
    }

    handleGoodClick(card) {

          var arr = this.state.goodPile.cards;
          arr.push(card);
          if (arr.length > 16) {
            arr.splice(0,1);
          }
          this.setState({
                goodPile : {
                    cards: arr
                },
                goodPulls : this.state.goodPulls+1
        });
      }
      
      handleBadClick(card) {

          var arr = this.state.badPile.cards;
          arr.push(card);
        if (arr.length > 16) {
            arr.splice(0,1);
          }
          this.setState({
            badPile : {
                cards: arr
            },
            badPulls : this.state.badPulls+1
    });
      }

      changeBackground(code) {

        var src;

        switch(code) {
            case "IMA":
            src = "https://magic.wizards.com/sites/mtg/files/pFlO2i9G6j.jpg";
            break;

            case "EMA":
            src = "https://magic.wizards.com/sites/mtg/files/images/featured/EMA_Header_Image.jpg";
            break;

            case "MM3":
            src = "https://magic.wizards.com/sites/mtg/files/RE8hXiBUA9.jpg";
            break;

            case "KTK":
            src = "https://noahbradley.com/wp-content/uploads/Noah-Bradley_mountain-khans-of-tarkir-2.jpg";
            break;

            case "BFZ":
            src ="http://media-dominaria.cursecdn.com/attachments/141/191/635722569063100993.jpg"
            break;
        }

          this.setState({backgroundImage : src});
      }
    
    render() {
      return (
        <div>
            <ReactCSSTransitionGroup
            transitionName="backdrop"
            transitionAppear={true}
            transitionEnter={true}
            transitionLeave={true}
            transitionAppearTimeout={1000}
            transitionLeaveTimeout={1000}
            >
                {this.state.backgroundImage!= ""
                    ?
                    <img key={this.state.setCode} className="fixed-backdrop" src={this.state.backgroundImage}></img>
                    :
                    <img key={this.state.setCode} className="fixed-backdrop" src={this.state.defaultBackground}></img>
                    }
            </ReactCSSTransitionGroup>
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-1 background hidden-sm hidden-xs"/>
                <div className="col-md-2 background hidden-sm hidden-xs pileColumn">
                    <Stats boostersOpened={this.state.boostersOpened} badPulls={this.state.badPulls} goodPulls={this.state.goodPulls}/>
                    <Pile data={this.state.badPile}/>
                </div>
                <div className="col-md-6">
                    {this.state.chooseBooster ? <ChooseBooster toggleSet={this.toggleSetCode} toggleMode={this.toggleMode}/> :
                    <Crack
                    goodClickHandler={this.handleGoodClick}
                    badClickHandler={this.handleBadClick}
                    toggle={this.toggleMode}
                    setCode={this.state.setCode}
                    updateBoosters={this.updateBoosterCount}/>}
                </div>
                
                <div className="col-md-2 background hidden-sm hidden-xs pileColumn">
                    <Pile data={this.state.goodPile}/>
                </div>
                <div className="col-md-1 background hidden-sm hidden-xs"/>
            </div>
        </div>
        </div>
      );
    }
}


module.exports = Layout;