var React = require("react");
var ReactDOM = require("react-dom");
var LuckyNumber = require('./LuckyNumber');

class Circle extends React.Component {
    constructor(props){
        super(props);
        this.state = { className : this.props.className, 
                       listItems:this.props.list, 
                       id:this.props.id, 
                       angle : 0, 
                       angles:[],
                       cx:0,
                       cy:0,
                       radius: 0,
                       radisuSat: 0,
                       deg2rad:0,
                       dataBadge : this.props.dataBadge                       
        };
        this.Loop  = this.Loop.bind(this);
        this.Animation  = this.Animation.bind(this);
        this.handleChange  = this.handleChange.bind(this);
    }

propTypes: {
        onComplete: React.PropTypes.func,
        updateStatistics: React.PropTypes.func
}

componentDidMount(){
    if(this.state.className == "ball-circle"){
        this.Animation();
        let counter = 0;
        let counterLuckyNumbers = 1;
        let $interval = 6000;
        let $ballwithBadgeInterval = 5300;
        let $ballClockMoveInterval = 4700;
        let $clockMoveInterval = 5200;
        let drumInterval = 1000/40; // => 60 fps = 60 pictures/sec
        let $value = 0;
        let numbersArray = [...this.state.listItems];
        let $this = this;
        let centerElementToUpdate = document.querySelector('.center-circle');
        
        let renderTimer = 100;  
        centerElementToUpdate.style.backgroundImage="url(./Images/Drum/Lotto0" + renderTimer + ".png)"; 

        let startRenderDrumAnimation = setInterval(function(){
            renderTimer++;
            console.log('renderTimer: ' + renderTimer);
            centerElementToUpdate.style.backgroundImage="url(./Images/Drum/Lotto0" + renderTimer + ".png)";             
            
            if(renderTimer > 627)
            {
              renderTimer = 110;
              //clearInterval(startRenderDrumAnimation);   
            }       
        },drumInterval);

        let exLoop = setInterval(function() {
            let elementToUpdate = document.querySelector('input.input-ball-circle:last-of-type');
            let badgeElementToUpdate = document.querySelector('[data-badge="' + counterLuckyNumbers + '"]');
            //console.log("elementToUpdate: " + elementToUpdate);            
            if(counter > numbersArray.length - 1 || !elementToUpdate)
            {
                clearInterval(exLoop); 

                centerElementToUpdate.innerHTML = "<div class='center-ball-animation-finished-text'>Kraj</div>";         
                setTimeout(function(){
                    $this.props.onComplete();
                }, 2000);               
                
            }
            else{                            
                $value = numbersArray[counter]; //++counter + $interval/1000;
                console.log(counterLuckyNumbers);
                let color = $this.handleBallColor($value);
                         
                let $classAnimation = "ball-selected-animation ball-selected-" + color;
                let $classAnimationBadges = "ball-selected-badges ball-selected-" + color;
                let $class = "ball-selected ball-selected-" + color;

                centerElementToUpdate.innerHTML = "<div class='center-ball-animation'>" + $value + "</div>";          

                setTimeout(function(){
                    let currentValue =  $value;
                    let currentBallClass = $classAnimation;
                    elementToUpdate.parentElement.innerHTML = "<div class='" + currentBallClass +"'><div class='ball-inner-circle'><div class='ball-circle-number'><span>" + currentValue + "</span></div></div></div>";
                }, $ballClockMoveInterval);

               setTimeout(function(){ 
                        let currentValue =  $value;
                        let currentBallClass = $classAnimationBadges;
                        badgeElementToUpdate.innerHTML = "<div class='" + currentBallClass +"'><div class='ball-inner-circle'><div class='ball-circle-number'><span>" + currentValue + "</span></div></div></div>";
                        counterLuckyNumbers++ ;
                        $this.props.updateStatistics($value);
                }, $ballwithBadgeInterval)
                
                counter++;             

                setTimeout(function(){ 
                        $this.Loop(true);}
                , $clockMoveInterval);                       
            }
        }, $interval);
    }
}

moveTopToBottom = (parentElement, startPosition) => {      
      //var elem = document.getElementById(elementClass);   
      let parentPos = parentElement.getBoundingClientRect(); 
      let element = parentElement.children[0];
      let pos = element.getBoundingClientRect();      
      let id = setInterval(frame, 10);
      let nextTop = pos.top;
      let nextWidth = element.clientWidth;
      let nextHeight = element.clientheigth;

      function frame() {
        if (nextTop == 350) {
          clearInterval(id);
        } else {
          console.log('position of center ball : ' + nextTop.toString());          
          nextTop++; 
          nextHeight--;
          nextWidth--;
          element.style.marginTop = nextTop.toString() + 'px'; 
          element.style.width = nextWidth.toString() + 'px'; 
          element.style.height = nextHeight.toString() + 'px'; 
          //elem.style.left = pos + 'px'; 
        }
      }
}


handleBallColor = ($value) => {
    let color = "black";
                
    if($value >= 1 && $value < 10)
        color = "yellow";
    if($value >= 10 && $value < 20)
        color = "red";
    if($value >= 20 && $value < 30)
        color = "blue";
    if($value >= 30 && $value < 40)
        color = "green";
    
    return color;
}

handleChange = (e) => {
    console.log("div changed to "+  e.target.value);
    alert('changed');
}

Loop = (move) => {
    let ballSelector = document.getElementsByClassName('ball-circle');
    let x, y;
    for(var i = 0; i < ballSelector.length; i++) {
        let circle = ballSelector[i];
        let mainState = this;
        let currentLeft = parseFloat(circle.style.left, 10);
        let currentTop = parseFloat(circle.style.top, 10); 
        const prevAngle = this.state.angles[i] - this.state.spc;
        const currenctAngle = this.state.angles[i];
        //console.log(this.state.angles[i]);

        this.setState((prevState, props) => ({
          angle: mainState.state.angles[i]
        }));
        //console.log(this.state.radiusSat);
        x = this.state.cx + this.state.radius * Math.cos(this.state.angle * this.state.deg2rad);
        y = this.state.cy + this.state.radius * Math.sin(this.state.angle * this.state.deg2rad);
        
        let nextLeft = x - this.state.radiusSat;
        let nextTop = y - this.state.radiusSat;
        
        let newAngles = this.state.angles.slice() //copy the array
        newAngles[i] = this.state.angles[i] + 18;//this.state.spc; //execute the manipulations
        
        this.setState((prevState, props) => ({
          angles: newAngles
        }));
        
        //console.log("this.state.angle: " + this.state.angle);
        if(move)
        {
            let moveSlowly = setInterval(function(){    
                   prevAngle++;                  

                   let x = mainState.state.cx + mainState.state.radius * Math.cos(prevAngle * mainState.state.deg2rad);
                   let y = mainState.state.cy + mainState.state.radius * Math.sin(prevAngle * mainState.state.deg2rad);
        
                   let nextLeft = x - mainState.state.radiusSat;
                   let nextTop = y - mainState.state.radiusSat;
                   //console.log("prevAngle: " + prevAngle + "currenctAngle: " + currenctAngle);
                   //--- when movement ends, stop interval
                   if(prevAngle == currenctAngle){
                        clearInterval(moveSlowly);
                   }
                   else
                   {
                       circle.style.left = (nextLeft).toString() + "px";
                       circle.style.top = (nextTop).toString() + "px";
                   }
            }, 5);
        }
        else{
            circle.style.left = (nextLeft).toString() + "px";
            circle.style.top = (nextTop).toString()+ "px";
        }        
    }
}

Animation = () => {
    //console.log(document.getElementById('center'));

    var centerElement = document.getElementsByClassName('center-circle')[0],
    pos = centerElement.getBoundingClientRect(),
    posOutsideCircle = document.getElementsByClassName('center-circle-outside')[0];
    radiusSatByElement = document.getElementsByClassName('ball-circle')[0].offsetWidth * 0.5,
    radiusByElement = centerElement.offsetWidth * 0.5,
    cxByElement = pos.left + radiusByElement,
    cyByElement = pos.top + radiusByElement,
    $this = this,
    numberOfBall = this.state.listItems.length,
    spc = 360 / numberOfBall,
    deg2radByElement = Math.PI / 180,
    i = 0;
    
    posOutsideCircle.style.top = (pos.top - 88).toString() + "px";
    posOutsideCircle.style.left = (pos.left - 88).toString() + "px";
    posOutsideCircle.style.width = (centerElement.width + 100).toString() + "px";
    posOutsideCircle.style.height = (centerElement.height + 100).toString() + "px";


    this.setState({
        radiusSat:radiusSatByElement,
        radius:radiusByElement,
        cx:cxByElement,
        cy:cyByElement,
        deg2rad:deg2radByElement,
        spc:spc,
        }, () => {
    });    

    let newAngles = this.state.angles.slice();// copy the array
    let newAngle = 90;

    for(let i = 0;i < numberOfBall; i++) {
        newAngles.push(newAngle);
        newAngle = newAngle - spc;
        this.setState({angle: newAngle}, () => {            
        }); 
    }
       
   this.setState({angles:newAngles}, () => {
    }); 

   //console.log($this.state.angles);
    
    /// space out radius
    radiusByElement += (radiusSatByElement + 10);
    this.setState({,
        radius:radiusByElement
        }, () => {
    });   

    initialLoop = setInterval(function() {
        $this.Loop(false);
        clearInterval(initialLoop);
    }, 1000);
}

render() {
    let id = this.props.id;
    let idPrefix =  this.props.id;
    const className = this.props.className;
    const badge = this.state.dataBadge;
    const numberValue = this.state.numberValue;
    let animation = this.props.animation;
    if(this.props.list.length === 0)
    {
        return <h1>There are no list items</h1>;
    }
    else{        
        return ( 
                   
            <div>                               
                {this.state.listItems.map(function(listValue, index){ 
                    id = idPrefix + "-" + index;  
                    let inputId = "input-" + idPrefix + "-" + index;  
                    let inputClassName = "input-" + className;

                    return <div key={index} className={className}  data-badge={badge} id={id}>
                                <LuckyNumber animation={animation} inputClassName = {inputClassName} luckyNumberValue={listValue} />                                                          
                           </div>;
                  })}
            </div>
        )  
    }
}
}

module.exports = Circle;
