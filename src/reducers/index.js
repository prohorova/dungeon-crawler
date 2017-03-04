import { combineReducers } from 'redux';
import game from './game';
import shadow from './shadow';

const reducers = combineReducers({game, shadow});

export default reducers;