import React, {Component} from 'react';

import {removeTimesheetEntry} from '../../services/timesheet';
import {cursorAngleToMarkerCoordinates} from './wheel';

import {editTimesheet} from '../../actions';

const Mark = props => {
    const {startAngle, endAngle, radius, trackWidth, center, dispatch} = props;
    let progressPath;
    const [startX, startY] = cursorAngleToMarkerCoordinates(startAngle, radius, trackWidth);
    const [endX, endY] = cursorAngleToMarkerCoordinates(endAngle, radius, trackWidth);
    let angleDifference = startAngle - endAngle;
    angleDifference = angleDifference < 0 ? angleDifference + 2 * Math.PI : angleDifference;
    if (angleDifference <= Math.PI) {
        progressPath = `M ${startX} ${startY} A ${radius - trackWidth / 2} ${radius - trackWidth / 2}, 0, 0, 1, ${endX} ${endY}`;
    } else {
        const [mediumX, mediumY] = cursorAngleToMarkerCoordinates(startAngle + Math.PI, radius, trackWidth);
        progressPath = `M ${startX} ${startY} A ${radius - trackWidth / 2} ${radius - trackWidth / 2}, 0, 0, 1, ${mediumX} ${mediumY}
        M ${mediumX} ${mediumY} A ${radius - trackWidth / 2} ${radius - trackWidth / 2}, 0, 0, 1, ${endX} ${endY}
        `;
    }
    return (
        <path
        d={progressPath}
        style={{
            strokeWidth: 10,
            stroke: 'blue',
            fill: 'none'
        }}
        onClick={() => dispatch(editTimesheet(props.relayId, props.id, props.from, props.to, props.active))}
        />
    )
}

export default Mark;
