import React, {Component} from 'react';
import Paper from 'material-ui/lib/paper';

import Header from './header';
import Body from './body';

import './style.scss';

export default props => (
    <div data-role='main'>
        <Paper data-role='panel' zDepth={2}>
            <Header/>
            <Body {...props}/>
        </Paper>
    </div>
);
