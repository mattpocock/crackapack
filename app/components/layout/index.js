var React = require('react');

var Crack = require('./crack');
var ChooseBooster = require('./choosebooster');

class Layout extends React.Component {
  
    constructor(props) {
      super(props);
      this.state = {
        setCode: "MM3",
        chooseBooster: true,
        goodPile: {
            cards: []
        },
        badPile: {
            cards: []
        }
      };

      this.toggleMode = this.toggleMode.bind(this);
      this.toggleSetCode = this.toggleSetCode.bind(this);
    }

    toggleMode(good, bad) {
        this.state.chooseBooster ? this.setState({chooseBooster : false}) : this.setState({chooseBooster: true});
        
        if (good === undefined) {
            good = {
                cards: []
            }
        }

        if (bad === undefined) {
            bad = {
                cards: []
            }
        }
        
        this.setState({goodPile: good, badPile: bad});
        
    }

    toggleSetCode(code) {
        this.setState({setCode: code});
    }
    
    render() {
      return (
        <div>
        {this.state.chooseBooster ? <ChooseBooster toggleSet={this.toggleSetCode} toggleMode={this.toggleMode}/> :
        <Crack goodPile={this.state.goodPile} badPile={this.state.badPile} toggle={this.toggleMode} setCode={this.state.setCode}/>}
        </div>
      );
    }
}


module.exports = Layout;