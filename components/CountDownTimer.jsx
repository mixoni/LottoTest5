var React = require("react");
var ReactDOM = require("react-dom");

class CountDownTimer extends React.Component {
    constructor(props) {
        super(props);
        this.state = { time: {}, seconds: this.props.seconds };
        this.timer = 0;
        this.startTimer = this.startTimer.bind(this);
        this.countDown = this.countDown.bind(this);
    }
    
    propTypes: {
        onComplete: React.PropTypes.func,
        onTimerExpired:React.PropTypes.func
    }

    secondsToTime = (secs) => {
        let hours = Math.floor(secs / (60 * 60));

        let divisor_for_minutes = secs % (60 * 60);
        let minutes = Math.floor(divisor_for_minutes / 60);

        let divisor_for_seconds = divisor_for_minutes % 60;
        let seconds = Math.ceil(divisor_for_seconds);
    
        hours = hours < 10 ? "0" + hours : hours;
        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        let obj = {
          "h": hours,
          "m": minutes,
          "s": seconds
        };
        return obj;
    }

    componentDidMount() {
        let timeLeftVar = this.secondsToTime(this.state.seconds);
        this.setState({ time: timeLeftVar });
        this.startTimer();
    }

    startTimer() {
        if (this.timer == 0) {
          this.timer = setInterval(this.countDown, 1000);
        }
    }

    countDown = () => {
        // Remove one second, set state so a re-render happens.
        let seconds = this.state.seconds - 1;
        this.setState({
          time: this.secondsToTime(seconds),
          seconds: seconds,
        });
    
        // Check if we're at zero.
        if (seconds == 5) { 
          clearInterval(this.timer);
          this.props.onTimerExpired()
        }
    }

    render() {
        return(
          <div className='countdown-timer'>
            {this.state.time.m}:{this.state.time.s}
          </div>
        );
    }
}

module.exports = CountDownTimer;
