var React = require("react");
var ReactDOM = require("react-dom");
var Circle = require('../components/Circle');

 class Animation extends React.Component {    
    constructor(props){
        super(props);
        this.state = {
                    showMe: "No",
                    selectedNumbers : [],
                    totalSum : 0,
                    minThreeSum: 0,
                    maxThreeSum : 0,
                    minFiveSum : 0,
                    maxFiveSum : 0,
                    minNumber : 0,
                    maxNumber: 0,
                    even : 0,
                    odd : 0                   
        };
        //this.calculateStatistics  = this.calculateStatistics.bind(this, 'Parameter');
    }   

    componentDidMount(){
        let $this = this;
        setTimeout(function(){ 
                     $this.setState({ showMe : "Yes" });
                }, 1000);  
    }
 
    propTypes: {
        onComplete: React.PropTypes.func,
        onTimerExpired:React.PropTypes.func
    }
    calculateStatistics = ($value) => {
       let $this = this;
       let selNumbers = [...this.state.selectedNumbers];
       selNumbers.push($value)
       this.setState({selectedNumbers:[...selNumbers]});
       console.log('selectedNumbers after push the value' + [...this.state.selectedNumbers])
       //--- total sum 
       let total = this.state.selectedNumbers.reduce((a, b) => a + b, 0);
       this.setState({totalSum:total});
       
       //--- sort ascending => min to max
       let selectedNumbersSorted = [...this.state.selectedNumbers].sort(function(a, b){return a - b});

       //-- min number
       let minNo = selectedNumbersSorted[0];
       this.setState({minNumber:selectedNumbersSorted[0]}); 
   
       //-- max number
       let maxNo = selectedNumbersSorted[selectedNumbersSorted.length-1];
       this.setState({maxNumber:maxNo});  
   

       //--- sum min 3 numbers
       if(selectedNumbersSorted.length >= 3 ){
            let minThreesum = selectedNumbersSorted.slice(0, 3).reduce((a, b) => a + b, 0);
            $this.setState({minThreeSum : minThreesum});         

           //--- sum max 3 numbers
           let maxThreesum = selectedNumbersSorted.slice(selectedNumbersSorted.length - 3, selectedNumbersSorted.length).reduce((a, b) => a + b, 0);
           $this.setState({maxThreeSum : maxThreesum});
       }
       
       if(selectedNumbersSorted.length >= 5){
           //--- sum min 5 numbers
           let minFiveSum = selectedNumbersSorted.slice(0, 5).reduce((a, b) => a + b, 0);
           $this.setState({minFiveSum : minFiveSum});  

           //--- sum max 5 numbers
           let maxFiveSum = selectedNumbersSorted.slice(selectedNumbersSorted.length - 5, selectedNumbersSorted.length).reduce((a, b) => a + b, 0);
           $this.setState({maxFiveSum : maxFiveSum});
       }
       //--- even : odd
       this.setState({even : this.even(selectedNumbersSorted)});
       this.setState({odd : this.odd(selectedNumbersSorted)});
    
    } 

    even = (array) => {
        let counter = 0 ;
        for (var i = 0; i < array.length; i++) {
             if(array[i] % 2 === 0)
                counter++;
        }
        return counter;
    }

    odd = (array) => {
        let counter = 0 ;
        for (var i = 0; i < array.length; i++) {
             if(array[i] % 2 !== 0)
                counter++;
        }
        return counter;
    }

    render() {
        return(
            <div> 
                <div className="col-md-12">
				    <div className="col-md-4 put-left">
					    <div className="row row-2">
						    <div className="col-md-12">
                                <Circle list={[0]} className="ball-logo" id="ball-logo"/> 
                                <Circle list={["G2"]} className="ball-game" id="ball-game-2" />                                                
                                <Circle list={["G3"]} className="ball-game" id="ball-game-3" />                                                
                                <Circle list={["G4"]} className="ball-game" id="ball-game-4" />                                                
                                <Circle list={["G5"]} className="ball-game" id="ball-game-5" />                                            
						    </div>
					    </div>
					    <div className="row row-10">
						    <div className="col-md-12">
                                <div className="statistic-result">
                                    <div>Zbir izvučenih brojeva : </div><div>{ this.state.totalSum }  </div>
                                </div>
                                <div className="statistic-result">
                                    <div>Zbir 3 najmanja broja : </div><div>{ this.state.minThreeSum }</div>  
                                </div>
                                <div className="statistic-result">
                                    <div>Zbir 3 najveća broja : </div><div>{ this.state.maxThreeSum }</div>  
                                </div>
                                <div className="statistic-result">
                                    <div>Zbir 5 najmanja broja : </div><div>{ this.state.minFiveSum }</div>  
                                </div>
                                <div className="statistic-result">
                                    <div>Zbir 5 najvećih brojeva : </div><div>{ this.state.maxFiveSum }</div>
                                </div>
                                <div className="statistic-result">
                                    <div>Najmanji broj : </div><div>{ this.state.minNumber }  </div>
                                </div>
                                <div className="statistic-result">
                                    <div>Najveći broj : </div><div>{ this.state.maxNumber }  </div>
                                </div>
                                <div className="statistic-result">
                                    <div>Par - Nepar : </div><div> { this.state.even } -  { this.state.odd } </div>
                                </div>
						    </div>
					    </div>
				    </div>
				    <div className="col-md-8 put-right">
					    <div className="row row-9">
						    <div show-me={this.state.showMe} className="col-md-12">
                                <Circle list={[0]} className="center-circle" id="center" /> 
                                <Circle list={[0]} className="center-circle-outside" id="center-outside" /> 
                                <Circle list={this.props.numbers} onComplete = {this.props.onComplete} updateStatistics={(i) => this.calculateStatistics(i)} animation={true} className="ball-circle" id="ball"/> 
						    </div>
                            <div className="animation-uninques">
                                <span>5616846685</span>
                                <span>09:30</span>
                            </div>
					    </div>
					    <div className="row row-3">
						    <div className="col-md-12">
                                    {this.props.numbers.map((object, i) => <Circle list={[0]} dataBadge={i+1} className="ball-numbers" key={i}/>)}                                                                                                                                     
						    </div>
					    </div>
				    </div>
			    </div>
            </div> 
        )        
    }
}

module.exports = Animation;