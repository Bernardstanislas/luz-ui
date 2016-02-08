import React, {Component} from 'react';

class Track extends Component {
    render() {
        const {radius, trackWidth} = this.props;
        return (
            <circle
                cx={radius}
                cy={radius}
                r={radius - trackWidth / 2}
                style={{
                    fill: 'none',
                    stroke: '#DDD',
                    strokeWidth: trackWidth
                }}
                data-role='track'
                ref='track'
                onMouseEnter={this.props.setMarkerVisibility.bind(this, true)}
                onMouseLeave={this.props.setMarkerVisibility.bind(this, false)}
                />
        )
    }
}

export default Track;
