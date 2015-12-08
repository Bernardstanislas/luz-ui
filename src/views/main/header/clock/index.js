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
        const now = moment().format('HH:mm');
        return (
            <div data-role='clock'>{now}</div>
        );
    }
}

export default Clock;
