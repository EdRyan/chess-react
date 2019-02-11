import { NEXT_TURN } from '../actions/types';

const INITIAL_STATE = {
    number: 1,
    player: 'white'
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case NEXT_TURN:
            return {
                ...state,
                number: state.number + 1,
                player: state.player === 'white' ? 'black' : 'white'
            };
        default:
            return state;
    }
}