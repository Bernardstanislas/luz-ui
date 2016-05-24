import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment';
import './style.scss';

import Wheel from './wheel';
import PressingGuide from './pressing-guide';

class Scheduler extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pressing: false,
            visible: false
        };
    }

    _updatePressingGuide(angle, pressing, visible, relayId) {
        this.setState({
            angle,
            pressing,
            visible,
            relayId
        });
    }

    render() {
        const {pressing, angle, visible, relayId} = this.state;
        return (
            <div data-role='scheduler'>
                <Wheel {...this.props} updatePressingGuide={::this._updatePressingGuide}/>
                {visible && <PressingGuide pressing={pressing} angle={angle} relayId={relayId}/>}
            </div>
        );
    }
}

export default Scheduler;
