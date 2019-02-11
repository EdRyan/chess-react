import { SELECT_PIECE } from '../actions/types';

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
        default:
            return state;
    }
}