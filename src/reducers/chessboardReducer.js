import { INITIALIZE_BOARD, PLAY_TURN, RESTART_GAME } from '../actions/types';
import {squareNameToArrayIndices} from "../helpers";


const INITIAL_STATE = [
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null]
];

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case INITIALIZE_BOARD:
            const newState = [...state];
            Object.keys(action.payload).map(square => {
                const [x,y] = squareNameToArrayIndices(square);
                newState[x][y] = action.payload[square];
            });
            return newState;
        case RESTART_GAME:
            const newInitialState = [...INITIAL_STATE];
            Object.keys(action.payload).map(square => {
                const [x,y] = squareNameToArrayIndices(square);
                newInitialState[x][y] = action.payload[square];
            });
            return newInitialState;
        case PLAY_TURN:
            const newBoardState = [...state];

            const [srcX,srcY] = squareNameToArrayIndices(action.payload.source.squareName);
            const {newPiece} = action.payload.source;
            newBoardState[srcX][srcY] = newPiece? {...newPiece} : null;

            const [destX,destY] = squareNameToArrayIndices(action.payload.destination.squareName);
            newBoardState[destX][destY] = {...action.payload.destination.newPiece};

            return newBoardState;
        default:
            return state;
    }
};