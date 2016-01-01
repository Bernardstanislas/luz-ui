import React, {Component} from 'react';
import './style.scss';

const trackWidth = 30;
const radius = 400;

class Scheduler extends Component {
    constructor(props) {
        super(props);
        this.state = {
            angle: Math.PI / 2
        }
    }

    _handleMouseMove({clientX, clientY, target}) {
        const {left, top} = target.parentElement.getBoundingClientRect();
        const [posX, posY] = [clientX - Math.floor(left) - radius, radius - clientY + Math.floor(top)];
        const angle = Math.atan2(posY, posX);
        this.setState({angle});
    }

    render() {
        const {radius} = this.props;
        const {angle} = this.state;
        const [markX, markY] = [(radius - trackWidth / 2) * Math.cos(angle) + radius, radius - (radius - trackWidth / 2) * Math.sin(angle)];
        return (
            <div data-role='scheduler'>
                <svg data-role='svg' width={2 * radius} height={2 * radius}>
                    <circle
                        cx={radius}
                        cy={radius}
                        r={radius - trackWidth / 2}
                        style={{
                            fill: 'none',
                            stroke: '#DDD',
                            strokeWidth: trackWidth
                        }}
                        onMouseMove={this._handleMouseMove.bind(this)}
                        />
                    <circle
                        cx={markX}
                        cy={markY}
                        r={5}
                        style={{
                            fill: 'blue'
                        }}
                        />
                </svg>
            </div>
        );
    }
}

Scheduler.defaultProps = {
    radius
};

export default Scheduler;
