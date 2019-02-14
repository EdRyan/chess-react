import {
    SELECT_PIECE,
    PLAY_TURN,
    RESTART_GAME,
    SHOW_PAWN_PROMOTION_MODAL,
    CANCEL_PAWN_PROMOTION_MODAL
} from '../actions/types';
import {squareNameToArrayIndices} from "../helpers";

const INITIAL_STATE = {
    selectedSquareName: '',
    enPassantSquareName: '',
    showPawnPromotionModal : null
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SELECT_PIECE:
            return {
                ...state,
                selectedSquareName: action.payload.squareName
            };
        case PLAY_TURN:
            let enPassantSquareName = ''

            if (action.payload.destination.newPiece.type === 'pawn') {
                const [srcX,srcY] = squareNameToArrayIndices(action.payload.source.squareName);
                const [dstX,dstY] = squareNameToArrayIndices(action.payload.destination.squareName);
                if (Math.abs(srcY-dstY) === 2) {
                     enPassantSquareName = action.payload.destination.squareName;
                }
            }

            return {
                ...state,
                selectedSquareName: '',
                enPassantSquareName: enPassantSquareName,
                showPawnPromotionModal: null
            };
        case SHOW_PAWN_PROMOTION_MODAL:
            return {
                ...state,
                showPawnPromotionModal: {...action.payload}
            };
        case CANCEL_PAWN_PROMOTION_MODAL:
            return {
                ...state,
                showPawnPromotionModal: null
            };
        case RESTART_GAME:
            return {...INITIAL_STATE};
        default:
            return state;
    }
}