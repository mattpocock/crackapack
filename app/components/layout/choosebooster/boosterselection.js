var React = require('react');

class BoosterSelection extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            sets : [
                {
                    setCode: "IMA",
                    backgroundUrl: "",
                    boosterUrl: "https://d1rw89lz12ur5s.cloudfront.net/photo/facetofacegames/file/1068633/large/Capture.png?1505405808"
                },
                {
                    setCode: "MM3",
                    backgroundUrl: "",
                    boosterUrl: "http://i.ebayimg.com/images/i/192111412116-0-1/s-l1000.jpg"
                },
                {
                    setCode: "EMA",
                    backgroundUrl: "",
                    boosterUrl: "https://cache.popcultcha.com.au/media/catalog/product/cache/1/image/1800x/040ec09b1e35df139433887a97daa66f/m/a/magic-gathering-eternal-masters-booster-display-box-large.1498521063.jpg"
                },
                {
                    setCode: "IMA",
                    backgroundUrl: "",
                    boosterUrl: "https://d1rw89lz12ur5s.cloudfront.net/photo/facetofacegames/file/1068633/large/Capture.png?1505405808"
                },
                {
                    setCode: "MM3",
                    backgroundUrl: "",
                    boosterUrl: "http://i.ebayimg.com/images/i/192111412116-0-1/s-l1000.jpg"
                },
                {
                    setCode: "EMA",
                    backgroundUrl: "",
                    boosterUrl: "https://cache.popcultcha.com.au/media/catalog/product/cache/1/image/1800x/040ec09b1e35df139433887a97daa66f/m/a/magic-gathering-eternal-masters-booster-display-box-large.1498521063.jpg"
                }
            ],
            firstCol: [],
            secondCol: [],
            thirdCol: []
        }

        this.fillColumns = this.fillColumns.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e) {
        this.props.toggleSet(e.target.alt);
        this.props.toggleMode();
    }

    fillColumns() {
        for(var i = 0; i < this.state.sets.length; i++) {
            if (i % 3 === 1) {
                var c = this.state.firstCol;
                c.push(this.state.sets[i]);
                this.setState({firstCol : c});
            } else if (i % 3 === 2) {
                var c = this.state.secondCol;
                c.push(this.state.sets[i]);
                this.setState({secondCol : c});
            } else {
                var c = this.state.thirdCol;
                c.push(this.state.sets[i]);
                this.setState({thirdCol : c});
            }
        }
    }

    componentWillMount() {
        
        this.fillColumns();

    }

    render() {
        return (
            <div className="row">
                <div className="col-xs-4">
                {this.state.firstCol.map(function(item, i) {
                    return <img key={i} alt={item.setCode} className="booster" onClick={this.handleClick} src={item.boosterUrl}/>;
                }, this)}
                </div>
                <div className="col-xs-4">
                {this.state.secondCol.map(function(item, i) {
                    return <img key={i} alt={item.setCode} className="booster" onClick={this.handleClick} src={item.boosterUrl}/>;
                }, this)}
                </div>
                <div className="col-xs-4">
                {this.state.thirdCol.map(function(item, i) {
                    return <img key={i} alt={item.setCode} className="booster" onClick={this.handleClick} src={item.boosterUrl}/>;
                }, this)}
                </div>
            </div>
        )
    }
}

module.exports = BoosterSelection;