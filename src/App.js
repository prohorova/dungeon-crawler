import React, { Component } from 'react';
import { connect } from 'react-redux';
import AppActionCreators from './actions/AppActionCreators';
import moveDirections from './utils/moveDirections';
import Board from './components/Board';
import Panel from './components/Panel';
import * as _ from 'underscore';

class App extends Component {
    componentDidMount() {
        this.props.init();

        document.addEventListener('keydown', _.throttle(e => {
            switch(e.key) {
                case 'ArrowUp':
                    this.props.move(moveDirections.UP);
                    break;
                case 'ArrowDown':
                    this.props.move(moveDirections.DOWN);
                    break;
                case 'ArrowLeft':
                    this.props.move(moveDirections.LEFT);
                    break;
                case 'ArrowRight':
                    this.props.move(moveDirections.RIGHT);
                    break;
            }
        }, 300));
    }
    render() {
        const { board, player, dungeonNumber, showShadow, setShadowVisibility } = this.props;
        let game;
        if (player) {
            game = (
                <div>
                    <Panel player={player} showShadow={showShadow}
                           setShadowVisibility={setShadowVisibility}/>
                    <Board board={board} showShadow={showShadow}
                           x={player.x} y={player.y}/>
                </div>
            )
        }
        return (
            <div>
                <h1>Dungeon {dungeonNumber}</h1>
                {game}
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    board: state.game.board,
    player: state.game.player,
    dungeonNumber: state.game.dungeonNumber,
    showShadow: state.shadow,
});

const mapDispatchToProps = (dispatch) => ({
    init: () => {
        dispatch(AppActionCreators.init())
    },
    move: (direction) => {
        dispatch(AppActionCreators.move(direction))
    },
    setShadowVisibility: (isVisible) => {
        dispatch(AppActionCreators.setShadowVisibility(isVisible))
    }

});

const AppContainer = connect(mapStateToProps, mapDispatchToProps)(App);

export default AppContainer;
