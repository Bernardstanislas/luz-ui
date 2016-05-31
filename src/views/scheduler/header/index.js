import React from 'react';
import Clock from './clock';
import Switch from './switch';

const Header = props => (
    <div data-role='header'>
        <Clock/>
        <Switch relayId='relay1' {...props}/>
        <Switch relayId='relay2' {...props}/>
    </div>
);

export default Header;
