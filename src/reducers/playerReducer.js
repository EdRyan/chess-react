import { SELECT_PIECE, PLAY_TURN, RESTART_GAME } from '../actions/types';

const INITIAL_STATE = {
    selectedSquareName: ''
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SELECT_PIECE:
            return {
                ...state,
                selectedSquareName: action.payload.squareName
            };
        case PLAY_TURN:
            return {
                ...state,
                selectedSquareName: ''
            };
        case RESTART_GAME:
            return {...INITIAL_STATE};
        default:
            return state;
    }
}