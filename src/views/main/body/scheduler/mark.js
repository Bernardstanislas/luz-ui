import React, {Component} from 'react';

class Mark extends Component {
    render() {
        const {startAngle, endAngle, radius, trackWidth} = this.props;
        let progressPath;
        const [startX, startY] = [(radius - trackWidth / 2) * Math.cos(startAngle) + radius, radius - (radius - trackWidth / 2) * Math.sin(startAngle)];
        const [endX, endY] = [(radius - trackWidth / 2) * Math.cos(endAngle) + radius, radius - (radius - trackWidth / 2) * Math.sin(endAngle)];
        let angleDifference = startAngle - endAngle;
        angleDifference = angleDifference < 0 ? angleDifference + 2 * Math.PI : angleDifference;
        if (angleDifference <= Math.PI) {
            progressPath = `M ${startX} ${startY} A ${radius - trackWidth / 2} ${radius - trackWidth / 2}, 0, 0, 1, ${endX} ${endY}`;
        } else {
            const [mediumX, mediumY] = [(radius - trackWidth / 2) * Math.cos(startAngle + Math.PI) + radius, radius - (radius - trackWidth / 2) * Math.sin(startAngle + Math.PI)];
            progressPath = `M ${startX} ${startY} A ${radius - trackWidth / 2} ${radius - trackWidth / 2}, 0, 0, 1, ${mediumX} ${mediumY}
            M ${mediumX} ${mediumY} A ${radius - trackWidth / 2} ${radius - trackWidth / 2}, 0, 0, 1, ${endX} ${endY}
            `;
        }
        return (
            <path
            d={progressPath}
            style={{
                strokeWidth: 10,
                stroke: 'blue',
                fill: 'none'
            }}
            />
        )
    }
}

export default Mark;
