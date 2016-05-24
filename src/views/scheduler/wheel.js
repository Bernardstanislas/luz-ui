import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment';

import {addNewTimesheetEntry} from '../../services/timesheet';

import Mark from './mark';

// Constants

const center = {x: 500, y: 500};

// Helpers

export const cursorAngleToMarkerCoordinates = (cursorAngle, radius, trackWidth) => [(radius - trackWidth / 2) * Math.cos(cursorAngle) + 500, 500 - (radius - trackWidth / 2) * Math.sin(cursorAngle)];

const convertDateToAngle = ({d, h, m}) => {
    let result = - 2 * Math.PI * (24 * 60 * (d - 1) + 60 * h + m) / 10080 + Math.PI / 2;
    if (result > Math.PI) result = result - 2 * Math.PI;
    if (result < - Math.PI) result = result + 2 * Math.PI;
    return result;
};

export const convertAngleToDate = angle => {
    const markDate = moment().startOf('week').add(1, 'd').add(( (-angle + Math.PI / 2) / (2 * Math.PI)) * 60 * 24 * 7, 'm');
    markDate.minutes(30 * Math.floor(markDate.minutes() / 30)); // Round minutes to 0 or 30
    return markDate;
}

const Wheel = props => (
    <svg data-role='svg' width={1000} height={1000}>
        <Track relayId='relay1' center={center} trackWidth={50} radius={450} {...props}/>
        <Track relayId='relay2' center={center} trackWidth={50} radius={400} {...props}/>
    </svg>
);

class Track extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cursorAngle: Math.PI / 2,
            markerVisible: false,
            pressing: false,
            pressingStartAngle: null
        }
    }

    _handleMouseMove({clientX, clientY}) {
        const {radius, trackWidth, updatePressingGuide, relayId} = this.props;
        const {left, top} = ReactDOM.findDOMNode(this.refs.bg).getBoundingClientRect();
        const [posX, posY] = [clientX - Math.floor(left) - radius + trackWidth / 2, radius - clientY + Math.floor(top) - trackWidth / 2];
        const cursorAngle = Math.atan2(posY, posX);
        updatePressingGuide(cursorAngle, this.state.pressing, this.state.markerVisible, relayId);
        this.setState({cursorAngle});
    }

    _handleMouseDown() {
        this.setState({
            pressing: true,
            pressingStartAngle: this.state.cursorAngle
        });
    }

    _handleMouseUp() {
        addNewTimesheetEntry(this.props.relayId, convertAngleToDate(this.state.pressingStartAngle), convertAngleToDate(this.state.cursorAngle));
        this.setState({
            pressing: false
        });
    }

    _setMarkerVisibilityBuilder() {
        return (visible, event) => {
            if (visible || (event && event.relatedTarget !== ReactDOM.findDOMNode(this.refs.marker))) {
                this.props.updatePressingGuide(this.state.cursorAngle, this.state.pressing, visible, this.props.relayId);
                this.setState({markerVisible: visible});
            }
        }
    }

    render() {
        const {radius, trackWidth, timesheets = {}, relayId} = this.props;
        const relayTimesheet = timesheets[relayId] || [];

        const {cursorAngle, markerVisible, pressing, pressingStartAngle} = this.state;
        const [markX, markY] = cursorAngleToMarkerCoordinates(cursorAngle, radius, trackWidth);
        return (
            <g onMouseMove={::this._handleMouseMove} onMouseDown={::this._handleMouseDown} onMouseUp={::this._handleMouseUp}>
                <TrackBackground {...this.props} setMarkerVisibility={this._setMarkerVisibilityBuilder()} ref='bg'/>
                {(markerVisible) &&
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
                    <Mark radius={radius} trackWidth={trackWidth} startAngle={pressingStartAngle} endAngle={cursorAngle} center={center}/>
                }
                {relayTimesheet.map(({id, from, to, active}) => {
                    const startAngle = convertDateToAngle(from);
                    const endAngle = convertDateToAngle(to);
                    return <Mark key={id} id={id} relayId={relayId} radius={radius} trackWidth={trackWidth} startAngle={startAngle} endAngle={endAngle} center={center} {...this.props} from={from} to={to} active={active}/>;
                })}
            </g>
        );
    }
}

class TrackBackground extends Component { // Needs to be a class in order to have a ref on it in Wheel
    render() {
        const {center, radius, trackWidth, setMarkerVisibility} = this.props;
        return (
            <circle
                cx={center.x}
                cy={center.y}
                r={radius - trackWidth / 2}
                style={{strokeWidth: trackWidth}}
                data-role='track'
                onMouseEnter={setMarkerVisibility.bind(null, true)}
                onMouseLeave={setMarkerVisibility.bind(null, false)}
                />
        );
    }
};

export default Wheel;
