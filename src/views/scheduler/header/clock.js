import React, {Component} from 'react';
import moment from 'moment';

class Clock extends Component {
    componentDidMount() {
        this._tick = setInterval(() => {
            this.forceUpdate();
        }, 1000);
    }

    componentWillUnmount() {
        clearInterval(this._tick);
    }

    render() {
        const now = moment();
        return (
            <div data-role='clock'>
                <div data-role='time'>{now.format('HH:mm')}</div>
                <div data-role='date'>{now.format('dddd')}</div>
            </div>
        );
    }
}

export default Clock;
