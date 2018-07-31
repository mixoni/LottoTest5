declare var require: any

var React = require("react");
var ReactDOM = require("react-dom");
var Scene = require('./components/Scene');
var ReactCountdownClock = require('react-countdown-clock');


const numbers = [1,2,33,14,5,36,27,8,19,30,21,12,39,40,15,6,17,38,9,24];
/*const numbers = [24,4,32,18,11,25,39,];*/


class App extends React.Component {    
      
    render() {
        return(
                <div className="main-body">
                    <Scene />
                </div>                         
        )        
    }
}

ReactDOM.render(<App />, document.getElementById('root'));