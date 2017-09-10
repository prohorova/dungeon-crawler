import React from 'react';
import tileTypes from '../utils/tileTypes';
import classNames from 'classnames';

const Tile = ({tile}) => {
    let classes = classNames({
        'tile': true,
        'wall': tile.type === tileTypes.WALL,
        'floor': tile.type === tileTypes.FLOOR,
        'enemy': tile.type === tileTypes.ENEMY,
        'boss': tile.isBoss,
        'player': tile.type === tileTypes.PLAYER,
        'weapon': tile.type === tileTypes.WEAPON,
        'health': tile.type === tileTypes.HEALTH,
        'exit': tile.type === tileTypes.EXIT
    });
    return (
        <div className={classes}></div>
    );
};

export default Tile;
