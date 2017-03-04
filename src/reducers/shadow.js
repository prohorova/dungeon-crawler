import constants from '../constants/constants';

const shadow = (state = true, action) => {
    if (action.type === constants.SET_SHADOW_VISIBILITY) {
        return action.isVisible;
    } else {
        return state;
    }
};

export default shadow;