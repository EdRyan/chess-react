import { PLAY_TURN, RESTART_GAME } from '../actions/types';

const INITIAL_STATE = {
    number: 1,
    player: 'white'
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case PLAY_TURN:
            return {
                ...state,
                number: state.number + 1,
                player: state.player === 'white' ? 'black' : 'white'
            };
        case RESTART_GAME:
            return {...INITIAL_STATE};
        default:
            return state;
    }
}