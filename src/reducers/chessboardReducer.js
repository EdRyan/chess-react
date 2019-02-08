import { UPDATE_BOARD } from '../actions/types';
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
        case UPDATE_BOARD:
            const newState = [...state];
            Object.keys(action.payload).map(square => {
                const [x,y] = squareNameToArrayIndices(square);
                newState[x][y] = action.payload[square];
            });
            return newState;
        default:
            return state;
    }
};