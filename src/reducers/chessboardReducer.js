import _ from 'lodash';
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
            const newInitialState = _.cloneDeep(INITIAL_STATE);
            Object.keys(action.payload).map(square => {
                const [x,y] = squareNameToArrayIndices(square);
                newInitialState[x][y] = action.payload[square];
            });
            return newInitialState;
        case PLAY_TURN:
            const newBoardState = [...state];

            // clear old piece position
            const [srcX,srcY] = squareNameToArrayIndices(action.payload.source.squareName);
            newBoardState[srcX][srcY] = null;

            const [destX,destY] = squareNameToArrayIndices(action.payload.destination.squareName);

            const piece = action.payload.destination.newPiece;
            if (piece.type === 'king' && !piece.hasMoved && (destX === 0 || destX === 7)) {
                // we are castling
                const newKingX = destX === 0 ? 2 : 6;
                const newRookX = destX === 0 ? 3 : 5;

                // set new king position
                newBoardState[newKingX][destY] = {...piece, hasMoved: true};
                // set new rook position
                newBoardState[newRookX][destY] = {...state[destX][destY], hasMoved: true}
                newBoardState[destX][destY] = null;
            } else if (piece.type === 'pawn' && destX-srcX !== 0 && !state[destX][destY]) {
                // en passant (pawn moving diagonally into an empty space)
                newBoardState[destX][destY] = {...piece, hasMoved: true};
                // clear out old pawn square
                const oldPawnY = piece.color === 'white' ? 4 : 3; // can only happen on one row
                newBoardState[destX][oldPawnY] = null;
            } else {
                newBoardState[destX][destY] = {...piece, hasMoved: true};
            }

            return newBoardState;
        default:
            return state;
    }
};