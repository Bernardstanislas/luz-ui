import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment';
import './style.scss';

import Wheel from './wheel';
import PressingGuide from './pressing-guide';
import Timesheet from './timesheet';
import Header from './header';

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
        const {editingTimesheet, timesheets} = this.props;
        return (
            <div data-role='scheduler'>
                <Wheel {...this.props} updatePressingGuide={::this._updatePressingGuide}/>
                <Header/>
                {visible && <PressingGuide pressing={pressing} angle={angle} relayId={relayId}/>}
                {!visible && editingTimesheet && editingTimesheet.timesheetId && <Timesheet timesheet={editingTimesheet} dispatch={this.props.dispatch}/>}
            </div>
        );
    }
}

export default Scheduler;
