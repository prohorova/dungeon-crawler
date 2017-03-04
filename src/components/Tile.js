import React, { Component } from 'react';
import tileTypes from '../utils/tileTypes';
import classNames from 'classnames';

class Tile extends Component {
    render() {
        let classes = classNames({
            'tile': true,
            'wall': this.props.tile.type === tileTypes.WALL,
            'floor': this.props.tile.type === tileTypes.FLOOR,
            'enemy': this.props.tile.type === tileTypes.ENEMY,
            'boss': this.props.tile.isBoss,
            'player': this.props.tile.type === tileTypes.PLAYER,
            'weapon': this.props.tile.type === tileTypes.WEAPON,
            'health': this.props.tile.type === tileTypes.HEALTH,
            'exit': this.props.tile.type === tileTypes.EXIT
        });
        return (
            <div className={classes}></div>
        );
    }
}

export default Tile;
