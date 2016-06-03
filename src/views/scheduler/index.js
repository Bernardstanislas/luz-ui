import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment';

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
        const timesheet = editingTimesheet && editingTimesheet.timesheetId && timesheets[editingTimesheet.relayId].filter(({id}) => id === editingTimesheet.timesheetId)[0];
        if (timesheet) timesheet.relayId = editingTimesheet.relayId;
        return (
            <div data-role='scheduler'>
                <Wheel {...this.props} updatePressingGuide={::this._updatePressingGuide}/>
                <Header {...this.props}/>
                {visible && <PressingGuide pressing={pressing} angle={angle} relayId={relayId}/>}
                {!visible && editingTimesheet && editingTimesheet.timesheetId && <Timesheet timesheet={timesheet} dispatch={this.props.dispatch}/>}
            </div>
        );
    }
}

export default Scheduler;
