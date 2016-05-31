import React, {Component} from 'react';
import mdDateTimePicker from 'md-date-time-picker';
import 'md-date-time-picker/dist/css/mdDateTimePicker.min.css';
import moment from 'moment';
import Draggabilly from 'draggabilly';

window.moment = moment;
window.Draggabilly = Draggabilly;

import {editTimesheet, removeTimesheetEntry} from '../../services/timesheet';
import {editTimesheet as reduxEditTimesheet} from '../../actions';

const timesheetChangeHandlerBuilder = (timesheet, from) => (newTime) => {
    if (from) {
        editTimesheet(timesheet.relayId, {
            id: timesheet.id,
            from: newTime,
            to: timesheet.to,
            active: timesheet.active
        });
    } else {
        editTimesheet(timesheet.relayId, {
            id: timesheet.id,
            from: timesheet.from,
            to: newTime,
            active: timesheet.active
        });
    }
}

const Timesheet = props => {
    const closeIconClick = () => props.dispatch(reduxEditTimesheet(null));
    const deleteIconClick = () => {
        closeIconClick();
        removeTimesheetEntry(props.timesheet.relayId, props.timesheet.id);
    };
    return (
        <div data-role='timesheet-edition' data-position='wheel-center'>
            <div data-role='from'>
                <i className='mdi mdi-led-on'></i>
                <Picker {...props.timesheet.from} onTimeChange={timesheetChangeHandlerBuilder(props.timesheet, true)}/>
            </div>
            <div data-role='center'>
                <div data-role='close' onClick={closeIconClick}>
                    <i className='mdi mdi-close'></i>
                </div>
                <div data-role='id'>
                    {props.timesheet.relayId}
                </div>
                <div data-role='delete' onClick={deleteIconClick}>
                    <i className='mdi mdi-delete'></i>
                </div>
            </div>
            <div data-role='to'>
                <i className='mdi mdi-led-variant-off'></i>
                <Picker {...props.timesheet.to} onTimeChange={timesheetChangeHandlerBuilder(props.timesheet, false)}/>
            </div>
        </div>
    );
}

class Picker extends Component {
    constructor(props) {
        super(props);
        this.state = {
            d: props.d,
            h: props.h,
            m: props.m
        };
    }

    componentWillReceiveProps(props) {
        this.setState({
            d: props.d,
            h: props.h,
            m: props.m
        });
    }

    componentDidMount() {
        const dialog = new mdDateTimePicker({
            type: 'time',
            init: moment().hour(this.props.h).minute(this.props.m),
            trigger: this.refs.picker
        });
        this.picker = dialog;
        this.refs.picker.addEventListener('onOk', ::this._onTimeChange);
    }

    componentWillUnmount() {
        this.refs.picker.removeEventListener('onOk', this._onTimeChange);
    }

    _onDayChange({target: {value: d}}) {
        this.setState({d}, () => this.props.onTimeChange({d: this.state.d, h: this.state.h, m: this.state.m}));
    }

    _onTimeChange() {
        const time = this.picker.time;
        this.setState({
            h: time.hours(),
            m: time.minutes()
        }, () => this.props.onTimeChange({d: this.state.d, h: this.state.h, m: this.state.m}));
    }

    render() {
        return (
            <div data-role='day-time-picker'>
                <div data-role='day-picker'>
                    <select onChange={::this._onDayChange} value={this.state.d}>
                        <option value={1}>Monday</option>
                        <option value={2}>Tuesday</option>
                        <option value={3}>Wednesday</option>
                        <option value={4}>Thursday</option>
                        <option value={5}>Friday</option>
                        <option value={6}>Saturday</option>
                        <option value={0}>Sunday</option>
                    </select>
                </div>
                <div data-role='time-picker'>
                    <button onClick={() => this.picker.toggle()} ref='picker'>{moment().hours(this.state.h).minutes(this.state.m).format('HH:mm')}</button>
                </div>
            </div>

        );
    }
}

export default Timesheet;
