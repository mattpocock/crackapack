var React = require('react');

var ReactCSSTransitionGroup = require('react-addons-css-transition-group');

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

    handleClick(e, code) {
        this.props.toggleSet(code);
        this.props.toggleMode();
    }

    fillColumns(arr) {

        console.log(arr);

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

    getSets() {

        fetch('https://api.magicthegathering.io/v1/sets/').then(function(response) {
            return response.json();
          }).then(function(json) {

            var arr = [];

            for (var i = 0; i < json.sets.length; i++) {

                if (json.sets[i].type === "expansion" || json.sets[i].type === "core" || json.sets[i].type === "masters" || json.sets[i].type === "reprint") {
                    
                    if (json.sets[i].code === "AER") {continue;}

                    var t = new Date(json.sets[i].releaseDate);
                    json.sets[i].dateObj = t.getTime();
                    arr.push(json.sets[i]);
                }

            }

            arr.sort(function (a, b) {
                return b.dateObj - a.dateObj;
              });

            this.fillColumns(arr);

          }.bind(this));
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
                            <img alt={item.name} src={"/app/components/layout/choosebooster/img/"+item.code.toLowerCase()+".jpg"} style={{width: "100%"}}/>
                        </div>);
                    }, this)}
                    </div>
                    <div className="col-xs-4">
                    {this.state.secondCol.map(function(item, i) {
                        return (
                            <div key={i}
                                className="booster"
                                onClick={(e) => this.handleClick(e, item.code)}>
                                <img alt={item.name} src={"/app/components/layout/choosebooster/img/"+item.code.toLowerCase()+".jpg"} style={{width: "100%"}}/>
                        </div>);
                    }, this)}
                    </div>
                    <div className="col-xs-4">
                    {this.state.thirdCol.map(function(item, i) {
                        return (
                            <div key={i}
                                className="booster"
                                onClick={(e) => this.handleClick(e, item.code)}>
                                <img alt={item.name} src={"/app/components/layout/choosebooster/img/"+item.code.toLowerCase()+".jpg"} style={{width: "100%"}}/>
                        </div>);
                    }, this)}
                    </div>
                </div>
            </ReactCSSTransitionGroup>
        )
    }
}

module.exports = BoosterSelection;