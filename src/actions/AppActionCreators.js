import constants from '../constants/constants';
import { DUNGEONS_COUNT } from '../utils/params';

const AppActionCreators = {
    init: () => {
        return {
            type: constants.INIT
        }
    },
    move: (direction) => {
        return (dispatch, getState) => {
            let prevDungeonNumber = getState().game.dungeonNumber;
            dispatch({
                type: constants.MOVE,
                direction
            });
            if (getState().game.player.health <= 0) {  // player has been killed
                alert('You have been killed!');
                dispatch({
                    type: constants.INIT
                });
            }
            if (getState().game.dungeonNumber > prevDungeonNumber) {
                dispatch({
                    type: constants.GO_TO_NEXT_LEVEL
                })
            }
            if (getState().game.dungeonNumber > DUNGEONS_COUNT) {
                alert('You won!');
                dispatch({
                    type: constants.INIT
                })
            }
        }
    },
    setShadowVisibility: (isVisible) => {
        return {
            type:constants.SET_SHADOW_VISIBILITY,
            isVisible
        }
    }

};

export default AppActionCreators;