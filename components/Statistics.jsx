var React = require("react");
var ReactDOM = require("react-dom");
var Circle = require('../components/Circle');
var CountDownTimer = require('./CountDownTimer');


class Statistics extends React.Component {
        constructor(props){
            super(props);
            this.state = { component: null,
                           rarelyNumber : [13],
                           rarelyTwoNumbers : [27,1],
                           rarelyThreeNumbers : [32,7,9],
                           rarelyFourNumbers : [22,39,17,6],
                           rarelyFiveNumbers : [22,39,17,6,8],
                           oftenNumber: [10],
                           oftenTwoNumbers: [10,6],
                           oftenThreeNumbers: [15,3,29],
                           oftenFourNumbers: [22,39,17,37],
                           oftenFiveNumbers: [22,39,17,6,18]
            };
        }

    componentDidMount(){
       this.setState({
            component : <div>
                <div className="row row-2-custom">
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
                <div className="row row-11-custom">
					<div className="col-md-6 put-left">
                            <div className="col-md-12 put-right">
                                <div className="statistics-title-right">Najredji broj</div>
                                <div className="statistics-result-right">{this.state.rarelyNumber.map((value, i) => <Circle list={[value]} className="ball-numbers-medium" key={i}/>)} </div>
                            </div>	
                            <div className="col-md-12 put-right">
                                <div className="statistics-title-right">Najredja dva broja</div>
                                <div className="statistics-result-right">{this.state.rarelyTwoNumbers.map((value, i) => <Circle list={[value]} className="ball-numbers-medium" key={i}/>)} </div>
                            </div>
                            <div className="col-md-12 put-right">
                                <div className="statistics-title-right">Najredja tri broja</div>
                                <div className="statistics-result-right">{this.state.rarelyThreeNumbers.map((value, i) => <Circle list={[value]} className="ball-numbers-medium" key={i}/>)} </div>
                            </div>	
                            <div className="col-md-12 put-right">
                                <div className="statistics-title-right">Najredja četiri broja</div>
                                <div className="statistics-result-right">{this.state.rarelyFourNumbers.map((value, i) => <Circle list={[value]} className="ball-numbers-medium" key={i}/>)} </div>
                            </div>	
                            <div className="col-md-12 put-right">
                                <div className="statistics-title-right">Najredjih pet brojeva</div>
                                <div className="statistics-result-right">{this.state.rarelyFiveNumbers.map((value, i) => <Circle list={[value]} className="ball-numbers-medium" key={i}/>)} </div>
                            </div>		                                                
					</div>
                    <div className="col-md-6 put-right">
                            <div className="col-md-12 put-left">
                                <div className="statistics-title-left">Najčešći broj</div>
                                <div className="statistics-result-left">{this.state.oftenNumber.map((value, i) => <Circle list={[value]} className="ball-numbers-medium" key={i}/>)} </div>
                            </div>	
                            <div className="col-md-12 put-left">
                                <div className="statistics-title-left">Najčešća dva broja</div>
                                <div className="statistics-result-left">{this.state.oftenTwoNumbers.map((value, i) => <Circle list={[value]} className="ball-numbers-medium" key={i}/>)} </div>
                            </div>
                            <div className="col-md-12 put-left">
                                <div className="statistics-title-left">Najčešća tri broja</div>
                                <div className="statistics-result-left">{this.state.oftenThreeNumbers.map((value, i) => <Circle list={[value]} className="ball-numbers-medium" key={i}/>)} </div>
                            </div>
                            <div className="col-md-12 put-left">
                                <div className="statistics-title-left">Najčešća četiri broja</div>
                                <div className="statistics-result-left">{this.state.oftenFourNumbers.map((value, i) => <Circle list={[value]} className="ball-numbers-medium" key={i}/>)} </div>
                            </div>	 
                            <div className="col-md-12 put-left">
                                <div className="statistics-title-left">Najčešćih pet brojeva</div>
                                <div className="statistics-result-left">{this.state.oftenFiveNumbers.map((value, i) => <Circle list={[value]} className="ball-numbers-medium" key={i}/>)} </div>
                            </div>	                                                                       
					</div>					        
			    </div> 
            </div> 
        });
    }
    
    render() {
        return(
             <div>
              {this.state.component} 
             </div>          
        )        
    }
    
}

module.exports = Statistics;