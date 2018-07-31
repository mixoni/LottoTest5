var React = require("react");
var ReactDOM = require("react-dom");
var ReactCountdownClock = require('react-countdown-clock');
var Animation = require('./Animation');
var Results = require('./Results');
var Circle = require('./Circle');
var Statistics = require('./Statistics');


class Scene extends React.Component {    
    constructor(props){
        super(props);
        this.state = {
            component: null,
            RemainingTime : 0 ,
            numbers : []        
        };
        
    }
    
    componentDidMount() {
        this.RenderCountdownScene()
    }
        
    RenderCountdownScene = () => {
         /*fetch("api/GetRemainingTime")
              .then(res => res.json())
              .then(
                (result) => {
                  console.log('result.seconds: ' + result.seconds);
                  this.setState({ RemainingTime : result.seconds });
                  this.setState({ component : <div className="with-flag">
                         <div className="title-header">Izvlačenje počinje za</div>
                         <ReactCountdownClock seconds={this.state.RemainingTime}
                         color="#4fc3f7"
                         alpha={0.9}
                         showMilliseconds = false
                         size={500}
                         onComplete={this.RenderAnimationScene} />
                         </div>
                })
                },
                (error) => {
                  console.log(error);
        });      */
        this.setState({ component : <div>
                         <ReactCountdownClock seconds={10}
                         color="#4fc3f7"
                         alpha={0.9}
                         showMilliseconds = false
                         size={500}
                         onComplete={this.RenderAnimationScene} />
                         </div>});
 
    }
    
    RenderAnimationScene = () => {
        //--- get remaining time for counter
         fetch("api/GetNumbers")
          .then(res => res.json())
          .then(
            (result) => {
              console.log('GetNumbers returns: ' + result.numbers);
              this.setState({ component : <Animation numbers={result.numbers} onComplete = {this.RenderLastThreeResultsScene} onTimerExpired={this.RenderCountdownScene} /> })
              
            },
            (error) => {
              console.log(error);
            }
          )
    }
   RenderLastThreeResultsScene = () => {
        this.setState({ component : 
                    <Results  onComplete = {this.RenderStatisticsScene}  onTimerExpired={this.RenderStatisticsScene}  />
        }) 
   }

   RenderStatisticsScene = () => {
        this.setState({ component : 
                    <Statistics  onComplete = {this.RenderCountdownScene}  onTimerExpired={this.RenderCountdownScene} />
        }) 
   }
        
    render() {
        return(
             <div>
              {this.state.component} 
             </div>          
        )        
    }
}

module.exports = Scene;