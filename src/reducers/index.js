import { combineReducers } from 'redux';
import chessboardReducer from "./chessboardReducer";
import turnReducer from "./turnReducer";

export default combineReducers({
    board: chessboardReducer,
    turn: turnReducer
});