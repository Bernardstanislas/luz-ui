import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment';
import './style.scss';

const trackWidth = 30;
const radius = 400;

class Scheduler extends Component {
    constructor(props) {
        super(props);
        this.state = {
            angle: Math.PI / 2,
            markerVisible: false
        }
    }

    _handleMouseMove({clientX, clientY, currentTarget}) {
        const {left, top} = currentTarget.getBoundingClientRect();
        const [posX, posY] = [clientX - Math.floor(left) - radius, radius - clientY + Math.floor(top)];
        const angle = Math.atan2(posY, posX);
        this.setState({angle});
    }

    _handleMouseEnterTrack({target}) {
        this.setState({markerVisible: true});
    }

    _handleMouseLeaveTrack({relatedTarget}) {
        if (relatedTarget !== ReactDOM.findDOMNode(this.refs.marker)) {
            this.setState({markerVisible: false});
        }
    }

    render() {
        const {radius} = this.props;
        const {angle, markerVisible} = this.state;
        const [markX, markY] = [(radius - trackWidth / 2) * Math.cos(angle) + radius, radius - (radius - trackWidth / 2) * Math.sin(angle)];
        const markDate = moment().startOf('week').add(1, 'd').add(( (-angle + Math.PI / 2) / (2 * Math.PI)) * 60 * 24 * 7, 'm');
        markDate.minutes(30 * Math.floor(markDate.minutes() / 30)); // Round minutes to 0 or 30
        return (
            <div data-role='scheduler'>
                <svg data-role='svg' width={2 * radius} height={2 * radius} onMouseMove={::this._handleMouseMove}>
                    <circle
                        cx={radius}
                        cy={radius}
                        r={radius - trackWidth / 2}
                        style={{
                            fill: 'none',
                            stroke: '#DDD',
                            strokeWidth: trackWidth
                        }}
                        data-role='track'
                        ref='track'
                        onMouseEnter={::this._handleMouseEnterTrack}
                        onMouseLeave={::this._handleMouseLeaveTrack}
                        />
                    <text x={radius} y={radius} fill='red'>
                        {markDate.format('dddd HH:mm')}
                    </text>
                    {markerVisible &&
                        <circle
                            cx={markX}
                            cy={markY}
                            r={5}
                            style={{
                                fill: 'blue'
                            }}
                            data-role='marker'
                            ref='marker'
                            />
                    }
                </svg>
            </div>
        );
    }
}

Scheduler.defaultProps = {
    radius
};

export default Scheduler;
