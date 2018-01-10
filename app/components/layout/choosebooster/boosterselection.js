var React = require('react');

var ReactCSSTransitionGroup = require('react-addons-css-transition-group');
var PropTypes = require('prop-types');

class BoosterSelection extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            sets : [],
            firstCol: [],
            secondCol: [],
            thirdCol: []
        }

        this.fillColumns = this.fillColumns.bind(this);
        this.getSets = this.getSets.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    // Handles selecting a booster
    handleClick(e, code) {
        this.props.toggleSet(code);
        this.props.toggleMode();
    }

    // Fetches a full set list from magicthegathering.io
    getSets() {

        fetch('https://api.magicthegathering.io/v1/sets/').then(function(response) {

            return response.json();

        }).then(function(json) {

            var arr = [];
            for (var i = 0; i < json.sets.length; i++) {

                // Only renders 'expansion', 'core', 'masters' and 'reprint' sets
                if (json.sets[i].type === "expansion" || json.sets[i].type === "core" ||
                        json.sets[i].type === "masters" || json.sets[i].type === "reprint") {
                    
                    // Skips out Aether Revolt because of an upstream issue
                    if (json.sets[i].code === "AER") {continue;}

                    // Adds a dateObj to sort the sets
                    var t = new Date(json.sets[i].releaseDate);
                    json.sets[i].dateObj = t.getTime();
                    arr.push(json.sets[i]);
                }

            }

            // Sorts the sets by chronological order
            arr.sort(function (a, b) {
                return b.dateObj - a.dateObj;
              });
            this.fillColumns(arr);

        }.bind(this))}
    
    // Takes an array of set data, and fills the three columns
    // to be displayed on the view
    fillColumns(arr) {

        arr = arr.slice(0, 24);
        var ticker = 1;

        for(var i = 0; i < arr.length; i++) {
            if (ticker === 1) {

                var c = this.state.firstCol;
                c.push(arr[i]);
                this.setState({firstCol : c});
                ticker++;

            } else if (ticker === 2) {

                var c = this.state.secondCol;
                c.push(arr[i]);
                this.setState({secondCol : c});
                ticker++;

            } else {

                var c = this.state.thirdCol;
                c.push(arr[i]);
                this.setState({thirdCol : c});
                ticker = 1;

            }
        }
    }

    componentWillMount() {
        this.getSets();
    }

    render() {
        return (

            <ReactCSSTransitionGroup
            transitionName="backdrop"
            transitionAppear={true}
            transitionLeave={true}
            transitionAppearTimeout={1000}
            transitionLeaveTimeout={1000}
            >

                <div className="row">

                    <div className="col-xs-4">
                        {this.state.firstCol.map(function(item, i) {
                            return (
                            <div key={i}
                                className="booster"
                                onClick={(e) => this.handleClick(e, item.code)}>
                                <img alt={item.name} src={"/img/"+item.code.toLowerCase()+".JPG"} style={{width: "100%"}}/>
                            </div>);
                        }, this)}
                    </div>

                    <div className="col-xs-4">
                        {this.state.secondCol.map(function(item, i) {
                            return (
                                <div key={i}
                                    className="booster"
                                    onClick={(e) => this.handleClick(e, item.code)}>
                                    <img alt={item.name} src={"/img/"+item.code.toLowerCase()+".JPG"} style={{width: "100%"}}/>
                            </div>);
                        }, this)}
                    </div>

                    <div className="col-xs-4">
                        {this.state.thirdCol.map(function(item, i) {
                            return (
                                <div key={i}
                                    className="booster"
                                    onClick={(e) => this.handleClick(e, item.code)}>
                                    <img alt={item.name} src={"/img/"+item.code.toLowerCase()+".JPG"} style={{width: "100%"}}/>
                            </div>);
                        }, this)}
                    </div>

                </div>

            </ReactCSSTransitionGroup>
            
        )
    }
}

BoosterSelection.propTypes = {

    toggleMode: PropTypes.func,
    toggleSet: PropTypes.func

}

module.exports = BoosterSelection;