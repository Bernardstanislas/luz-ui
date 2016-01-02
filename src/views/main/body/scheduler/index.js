import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment';
import './style.scss';

import Track from './track';
import Mark from './mark';

const trackWidth = 30;
const radius = 400;

class Scheduler extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cursorAngle: Math.PI / 2,
            markerVisible: false,
            pressing: false
        }
    }

    _handleMouseMove({clientX, clientY, currentTarget}) {
        const {left, top} = currentTarget.getBoundingClientRect();
        const [posX, posY] = [clientX - Math.floor(left) - radius, radius - clientY + Math.floor(top)];
        const cursorAngle = Math.atan2(posY, posX);
        this.setState({cursorAngle});
    }

    _handleMouseDown() {
        this.setState({
            pressing: true,
            pressedAngle: this.state.cursorAngle
        });
    }

    _handleMouseUp() {
        this.setState({
            pressing: false
        });
    }

    _setMarkerVisibilityBuilder() {
        return (visible, event) => {
            if (visible || (event && event.relatedTarget !== ReactDOM.findDOMNode(this.refs.marker))) {
                this.setState({markerVisible: visible});
            }
        }
    }

    render() {
        const {radius} = this.props;
        const {cursorAngle, markerVisible, pressing, pressedAngle} = this.state;
        const [markX, markY] = [(radius - trackWidth / 2) * Math.cos(cursorAngle) + radius, radius - (radius - trackWidth / 2) * Math.sin(cursorAngle)];
        const markDate = moment().startOf('week').add(1, 'd').add(( (-cursorAngle + Math.PI / 2) / (2 * Math.PI)) * 60 * 24 * 7, 'm');
        markDate.minutes(30 * Math.floor(markDate.minutes() / 30)); // Round minutes to 0 or 30
        return (
            <div data-role='scheduler'>
                <svg data-role='svg' width={2 * radius} height={2 * radius} onMouseMove={::this._handleMouseMove} onMouseDown={::this._handleMouseDown} onMouseUp={::this._handleMouseUp}>
                    <Track radius={radius} trackWidth={trackWidth} setMarkerVisibility={this._setMarkerVisibilityBuilder()}/>
                    <text x={radius} y={radius} fill='red'>
                        {markDate.format('dddd HH:mm')}
                    </text>
                    {(markerVisible || pressing) &&
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
                    {pressing &&
                        <Mark radius={radius} trackWidth={trackWidth} startAngle={pressedAngle} endAngle={cursorAngle}/>
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
