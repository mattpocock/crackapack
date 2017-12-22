var React = require('react');

var BoosterSelection = require('./boosterselection')

class ChooseBooster extends React.Component {

    constructor(props) {
        super(props);

        this.state = {backgroundImage: ""};
        
    }

    

    changeBackground(url) {
        this.setState({backgroundImage: url});
    }

    render() {
        return (
            
        <div className="col-md-12 background light">
              <div className="row">
                <h1 className="align-center">Crack A Pack</h1>
                <h4 className="align-center">Guilt-Free Pack Cracking</h4>
                <h1 style={{marginBottom: "20px", marginLeft: "20px"}}>Choose A Booster Pack</h1>
            </div>
            <BoosterSelection toggleSet={this.props.toggleSet} toggleMode={this.props.toggleMode}/>
        </div>
            
        );
    }
}

module.exports = ChooseBooster;