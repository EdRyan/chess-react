import { combineReducers } from 'redux';
import chessboardReducer from "./chessboardReducer";
import turnReducer from "./turnReducer";
import playerReducer from "./playerReducer";

export default combineReducers({
    board: chessboardReducer,
    turn: turnReducer,
    player: playerReducer
});