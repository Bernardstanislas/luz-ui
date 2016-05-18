import React from 'react';

import Base from './base';
import Relay from './relay';
import Scheduler from './scheduler';

export default props => (
    <div>
        <Base basePresence={props.basePresence}/>
        <Relay id='relay1' name='Relay 1' switched={props.relays.relay1}/>
        <Relay id='relay2' name='Relay 2' switched={props.relays.relay2}/>
        <Scheduler timesheets={props.timesheets} />
        <p style={{padding: 50, color: '#E91E63'}}>Caution ! This is a pre-release version of the user interface. Please take note that this does not cover all the features offered by the base, such as relays scheduling. This will be implemented in a future version.</p>
    </div>
);
