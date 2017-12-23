var React = require('react');

class NextBooster extends React.Component {
    render() {
        return (
            <div className="next-booster__container col-xs-12">
                <div className="row">
                    <div className="col-xs-6">
                        <img
                            className="booster"
                            src={"/app/components/layout/choosebooster/img/"+this.props.code.toLowerCase()+".jpg"}
                            onClick={this.props.same}/>
                    </div>
                    <div className="col-xs-6">
                        <button className="next-booster__button" onClick={this.props.new}>Choose Set</button>
                    </div>
                </div>
            </div>
        );
    }
}

module.exports = NextBooster;