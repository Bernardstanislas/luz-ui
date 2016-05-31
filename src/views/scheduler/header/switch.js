import React, {Component} from 'react';
import {manualToggleRelay} from '../../../services/relay';

class Switch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            switched: this._getRelayState(props)
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({switched: this._getRelayState(nextProps)});
    }

    _getRelayState({relays, relayId}) {
        return relays[relayId];
    }

    _toggleRelay() {
        this.setState({switched: !this.state.switched}, () => {
            manualToggleRelay(this.props.relayId, this.state.switched);
        });
    }

    render() {
        const {relayId} = this.props;
        const {switched} = this.state;
        const icon = switched ? 'toggle-switch' : 'toggle-switch-off';
        return (
            <div data-role='relay'>
                <div data-role='id'>{relayId}</div>
                <div data-role='icon' onClick={::this._toggleRelay}><i className={`mdi mdi-${icon}`}></i></div>
            </div>
        );
    }
}

export default Switch;
