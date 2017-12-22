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
        backgroundImage : undefined,
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

            case "XLN":
            src = "https://magic.wizards.com/sites/mtg/files/sYCla2unGd_0.jpg";
            break;

            case "HOU":
            src = "https://magic.wizards.com/sites/mtg/files/HOU_Header.jpg";
            break;

            case "AKH":
            src = "https://magic.wizards.com/sites/mtg/files/images/featured/x5vcfbwc49_h3der.jpg";
            break;

            case "AER":
            src = "https://magic.wizards.com/sites/mtg/files/images/featured/AER_Header_Preloader_0.jpg";
            break;

            case "KLD":
            src = "http://www.thebagofloot.com/wp-content/uploads/2016/05/kaladesh.jpg"
            break;

            case "EMN" :
            src = "https://magic.wizards.com/sites/mtg/files/images/featured/EMN_Header2_20.jpg";
            break;

            case "SOI" :
            src = "https://magic.wizards.com/sites/mtg/files/images/featured/SIO_Header_New_Preloader.jpg";
            break;

            case "OGW" :
            src = "https://magic.wizards.com/sites/mtg/files/images/featured/OGW_header_preloader.jpg"
            break;

            case "BFZ":
            src ="http://media-dominaria.cursecdn.com/attachments/141/191/635722569063100993.jpg";
            break;

            case "ORI":
            src = "https://i.pinimg.com/originals/9d/be/b7/9dbeb7b6ffb7668450f2e291978d903a.jpg";
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
                {this.state.backgroundImage !== undefined
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
                <div className="col-md-6 scroll-y">
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