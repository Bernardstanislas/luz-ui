import {connect} from 'react-redux';
import React, {Component} from 'react';
import Paper from 'material-ui/lib/paper';

import Scheduler from './scheduler';

import './style.scss';

const Container = props => (
    <div data-role='main'>
        <Paper data-role='panel' zDepth={2}>
            <Scheduler {...props}/>
        </Paper>
    </div>
);

const select = ({login, basePresence, relays, timesheets}) => {
    return {login, basePresence, relays, timesheets};
}

export default connect(select)(Container);
