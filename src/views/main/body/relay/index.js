import React, {Component} from 'react';

import Icon from 'material-ui/lib/font-icon';
import Toggle from 'material-ui/lib/toggle';

import './style.scss';

import {relaysRef} from '../../../../firebase';

class Relay extends Component {
    constructor(props) {
        super(props);
        this.state = {
            waiting: false
        }
    }

    componentDidMount() {
        relaysRef.child(this.props.id).child('manual').on('value', this.handleManualChange.bind(this));
    }

    componentWillUnmount() {
        relaysRef.child(this.props.id).child('manual').off('value', this.handleManualChange, this);
    }

    handleManualChange(snapshot) {
        const manual = snapshot.val();
        if (!manual) this.setState({waiting: false});
    }

    handleSwitch(event, switched) {
        relaysRef.child(this.props.id).set({switched, manual: true});
        this.setState({waiting: true});
    }

    render() {
        const {switched, name} = this.props;
        const {waiting} = this.state;
        const iconName = switched ? 'flash_on' : 'flash_off';
        return (
            <div data-role='relay'>
                <div data-role='name'>
                    {name}
                </div>
                <div data-role='icon'>
                    <Icon className='material-icons' style={{fontSize: 40}}>{iconName}</Icon>
                </div>
                <div data-role='toggle'>
                    <Toggle
                        defaultToggled={switched}
                        disabled={waiting}
                        onToggle={this.handleSwitch.bind(this)}
                        style={{marginTop: 10}}
                    />
                </div>
            </div>
        );
    }
}

export default Relay;
