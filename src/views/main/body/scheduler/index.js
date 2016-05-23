import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment';
import './style.scss';

import {addNewTimesheetEntry} from '../../../../services/timesheet';

import Track from './track';
import Mark from './mark';

const trackWidth = 30;
const radius = 400;

const convertDateToAngle = ({d, h, m}) => {
    let result = - 2 * Math.PI * (24 * 60 * (d - 1) + 60 * h + m) / 10080 + Math.PI / 2;
    if (result > Math.PI) result = result - 2 * Math.PI;
    if (result < - Math.PI) result = result + 2 * Math.PI;
    return result;
};

const convertAngleToDate = angle => {
    const markDate = moment().startOf('week').add(1, 'd').add(( (-angle + Math.PI / 2) / (2 * Math.PI)) * 60 * 24 * 7, 'm');
    markDate.minutes(30 * Math.floor(markDate.minutes() / 30)); // Round minutes to 0 or 30
    return markDate;
}

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
        addNewTimesheetEntry('relay1', convertAngleToDate(this.state.pressedAngle), convertAngleToDate(this.state.cursorAngle));
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
        const {timesheets} = this.props;
        const {relay1: relay1timesheet = []} = timesheets;
        const {cursorAngle, markerVisible, pressing, pressedAngle} = this.state;
        const [markX, markY] = [(radius - trackWidth / 2) * Math.cos(cursorAngle) + radius, radius - (radius - trackWidth / 2) * Math.sin(cursorAngle)];
        const markDate = convertAngleToDate(cursorAngle);
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
                    {relay1timesheet.map(({id, from, to}) => {
                        const startAngle = convertDateToAngle(from);
                        const endAngle = convertDateToAngle(to);
                        return <Mark key={id} id={id} relayId={'relay1'} radius={radius} trackWidth={trackWidth} startAngle={startAngle} endAngle={endAngle}/>;
                    })}
                </svg>
            </div>
        );
    }
}

Scheduler.defaultProps = {
    radius
};

export default Scheduler;
