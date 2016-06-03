import React from 'react';

import {convertAngleToDate} from './wheel';

const PressingGuide = props => {
    const displayedDate = convertAngleToDate(props.angle).format('dddd HH:mm');
    return (
        <div data-role='pressing-guide' data-position='wheel-center'>
            <div data-role='icon'>
                <i className={props.pressing ? 'mdi mdi-lightbulb-outline' : 'mdi mdi-lightbulb'}></i>
            </div>
            <div data-role='relay'>
                {props.relayId}
            </div>
            <div data-role='date'>
                {displayedDate}
            </div>
            <div data-role='instructions'>
                {!props.pressing && `Click and hold to draw a new schedule for ${props.relayId}.`}
                {props.pressing && `Release click when you have reached the shutdown time.`}
            </div>
        </div>
    );
}

export default PressingGuide;
