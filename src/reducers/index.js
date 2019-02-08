import { combineReducers } from 'redux';
import chessboardReducer from "./chessboardReducer";

export default combineReducers({
    board: chessboardReducer
});