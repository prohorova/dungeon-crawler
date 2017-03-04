import React, { Component } from 'react';
import Shadow from './Shadow';
import { WIDTH, TILE_SIZE } from '../utils/params';
import * as utils from '../utils/utils';
import Tile from './Tile';

class Board extends Component {
    render() {
        let boardStyle = {width: WIDTH * TILE_SIZE + 'px'};
        let turnedBoard = utils.overturnBoard(this.props.board);
        let board = turnedBoard.map((tileRow, rowIndex) => {
            return <div key={rowIndex} className="tile-row">
                {
                    tileRow.map((tile, tileIndex) => {
                        return <Tile key={rowIndex + '_' + tileIndex} tile={tile} />
                    })
                }
            </div>
        });
        let shadow;
        if (this.props.showShadow) {
            shadow = <Shadow x={this.props.x} y={this.props.y} />;
        }
        return (
            <div className="board-wrapper" style={boardStyle}>
                {shadow}
                <div className="board" >{board}</div>
            </div>
        );
    }
}

export default Board;
