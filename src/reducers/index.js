import { combineReducers } from 'redux';
import chessboardReducer from "./chessboardReducer";
import turnReducer from "./turnReducer";
import selectedPieceReducer from "./selectedPieceReducer";

export default combineReducers({
    board: chessboardReducer,
    turn: turnReducer,
    selectedPiece: selectedPieceReducer
});