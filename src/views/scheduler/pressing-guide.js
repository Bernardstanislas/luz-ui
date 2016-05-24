import React from 'react';

import {convertAngleToDate} from './wheel';

const PressingGuide = props => {
    const displayedDate = convertAngleToDate(props.angle).format('dddd HH:mm');
    return (
        <div data-role='pressing-guide' data-position='wheel-center'>
            <div data-role='icon'>
                <i className={props.pressing ? 'mdi mdi-led-variant-off' : 'mdi mdi-led-on'}></i>
            </div>
            <div data-role='relay'>
                {props.relayId}
            </div>
            <div data-role='date'>
                {displayedDate}
            </div>
        </div>
    );
}

export default PressingGuide;
