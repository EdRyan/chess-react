import { SELECT_PIECE, PLAY_TURN, RESTART_GAME } from '../actions/types';

const INITIAL_STATE = {
    squareName: '',
    allowedMoves: []
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SELECT_PIECE:
            return {
                ...state,
                squareName: action.payload.squareName,
                allowedMoves: [...action.payload.allowedMoves]
            };
        case PLAY_TURN:
            return {
                ...state,
                squareName: '',
                allowedMoves: []
            };
        case RESTART_GAME:
            return {...INITIAL_STATE};
        default:
            return state;
    }
}