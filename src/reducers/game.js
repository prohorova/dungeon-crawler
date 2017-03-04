import constants from '../constants/constants';
import * as utils from '../utils/utils';

let initialState = {
    board: [[]],
    player: null,
    dungeonNumber: 0
};

const board = (state = initialState, action) => {
    switch (action.type) {
        case constants.INIT: {
            let gameParams = utils.initGame();
            return {...state, ...gameParams};
        }

        case constants.MOVE: {
            let gameParams = utils.move(state.board, state.player, state.dungeonNumber, action.direction);
            return {...state, ...gameParams};
        }

        case constants.GO_TO_NEXT_LEVEL: {
            let gameParams = utils.initGame(state.dungeonNumber, state.player);
            return {...state, ...gameParams};
        }

        default:
            return state;
    }
};

export default board;