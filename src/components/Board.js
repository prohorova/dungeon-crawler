import React from 'react';
import Shadow from './Shadow';
import { WIDTH, TILE_SIZE } from '../utils/params';
import * as utils from '../utils/utils';
import Tile from './Tile';

const Board = ({board, x, y, showShadow}) => {
    let boardStyle = {width: WIDTH * TILE_SIZE + 'px'};
    let turnedBoard = utils.overturnBoard(board);
    let boardEl = turnedBoard.map((tileRow, rowIndex) => {
        return <div key={rowIndex} className="tile-row">
            {
                tileRow.map((tile, tileIndex) => {
                    return <Tile key={rowIndex + '_' + tileIndex} tile={tile} />
                })
            }
        </div>
    });
    let shadow;
    if (showShadow) {
        shadow = <Shadow x={x} y={y} />;
    }
    return (
        <div className="board-wrapper" style={boardStyle}>
            {shadow}
            <div className="board" >{boardEl}</div>
        </div>
    );
};

export default Board;
