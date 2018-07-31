var React = require("react");
var ReactDOM = require("react-dom");
var LuckyNumber = require('./LuckyNumber');
var Circle = require('./Circle');
var CountDownTimer = require('./CountDownTimer');

class Results extends React.Component { 
    constructor(props){
        super(props);
        this.state = {
                       listItems1:[5,21,38,25,11,6,16,29,24,35,9,22,33,1,14,36,3,15,35,8], 
                       listItems2:[14,37,31,11,10,22,28,19,17,26,30,10,4,31,4,11,15,15,20,24], 
                       listItems3:[6,24,9,16,6,29,17,4,29,6,22,30,15,2,38,32,33,25,14,5], 
                       id:this.props.id
        };
        
    }
    
    const $this = this;

    propTypes: {
        onComplete: React.PropTypes.func,
        onTimerExpired: React.PropTypes.func
    }
    render() {
        const className = this.props.className;
        return (            
            <div>
			    <div className="row row-2">
					<div className="col-md-7">
                        <Circle list={[0]} className="ball-logo" id="ball-logo"/> 
                        <Circle list={["G2"]} className="ball-game" id="ball-game-2" />                                                
                        <Circle list={["G3"]} className="ball-game" id="ball-game-3" />                                                
                        <Circle list={["G4"]} className="ball-game" id="ball-game-4" />                                                
                        <Circle list={["G5"]} className="ball-game" id="ball-game-5" />                                                
					</div>
                    <div className="col-md-3 put-right">
                        <CountDownTimer seconds={ 25 } onComplete={this.props.onComplete} onTimerExpired={this.props.onTimerExpired}/>                                                                        
					</div>					        
			    </div>
                <div className="row row-3-custom">
                    <div className="col-md-2 results-time">
                        09:30
				    </div>
                    <div className="col-md-9 results-numbers">
                        <div>{this.state.listItems1.map((value, i) => <Circle list={[value]} dataBadge={i+1} className="ball-numbers-medium" key={i}/>)} </div>
				    </div>
			    </div>
                <div className="row row-3-custom">
                    <div className="col-md-2 results-time">
                        09:25
				    </div>
                    <div className="col-md-9 results-numbers">
                        <div>{this.state.listItems2.map((value, i) => <Circle list={[value]} dataBadge={i+1} className="ball-numbers-medium" key={i}/>)} </div>
				    </div>
			    </div>
                <div className="row row-3-custom">
                    <div className="col-md-2 results-time">
                        09:20
				    </div>
                   <div className="col-md-9 results-numbers">
                        <div>{this.state.listItems3.map((value, i) => <Circle list={[value]} dataBadge={i+1} className="ball-numbers-medium" key={i}/>)} </div>
				    </div>
			    </div>    
            </div> 
        )  
    }
}

module.exports = Results;