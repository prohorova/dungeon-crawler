import React, { Component } from 'react';
import { TILE_SIZE, HEIGHT } from '../utils/params';

class Panel extends Component {
    render() {
        let size = TILE_SIZE * 10 + 'px';
        let boardX = this.props.x * TILE_SIZE + 'px';
        let boardY = HEIGHT * TILE_SIZE - this.props.y * TILE_SIZE + 'px';
        let backgroundStyle = {background:
        'radial-gradient(' + size + ' ' + size + ' at '+ boardX + ' ' + boardY + ', rgba(0,0,0,0), rgba(0,0,0,1))'};
        return (
            <div>
                <div className="shadow" style={backgroundStyle}></div>
            </div>
        )
    }
}

export default Panel;
