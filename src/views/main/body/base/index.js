import React from 'react';
import moment from 'moment';

import './style.scss';

export default ({basePresence}) => {
    const text = (() => {
        switch(basePresence) {
            case false:
                return 'The base was never seen online.';
            case true:
                return 'The base is online';
            default:
                return `The base is offline. It was last seen ${moment(basePresence).fromNow()}`;
        }
    })();
    return (
        <div data-role='base' data-present={basePresence === true}>
            {text}
        </div>
    );
}
