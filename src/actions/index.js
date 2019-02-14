import {
    INITIALIZE_BOARD,
    PLAY_TURN,
    SELECT_PIECE,
    RESTART_GAME,
    SHOW_PAWN_PROMOTION_MODAL,
    CANCEL_PAWN_PROMOTION_MODAL
} from './types';

const getPiece = (type, color) => { return {type, color, hasMoved: false}; }

const DEFAULT_CHESSBOARD = {
    a1: getPiece('rook','white'),
    b1: getPiece('knight','white'),
    c1: getPiece('bishop','white'),
    d1: getPiece('queen','white'),
    e1: getPiece('king','white'),
    f1: getPiece('bishop','white'),
    g1: getPiece('knight','white'),
    h1: getPiece('rook','white'),
    a2: getPiece('pawn','white'),
    b2: getPiece('pawn','white'),
    c2: getPiece('pawn','white'),
    d2: getPiece('pawn','white'),
    e2: getPiece('pawn','white'),
    f2: getPiece('pawn','white'),
    g2: getPiece('pawn','white'),
    h2: getPiece('pawn','white'),
    a7: getPiece('pawn','black'),
    b7: getPiece('pawn','black'),
    c7: getPiece('pawn','black'),
    d7: getPiece('pawn','black'),
    e7: getPiece('pawn','black'),
    f7: getPiece('pawn','black'),
    g7: getPiece('pawn','black'),
    h7: getPiece('pawn','black'),
    a8: getPiece('rook','black'),
    b8: getPiece('knight','black'),
    c8: getPiece('bishop','black'),
    d8: getPiece('queen','black'),
    e8: getPiece('king','black'),
    f8: getPiece('bishop','black'),
    g8: getPiece('knight','black'),
    h8: getPiece('rook','black')
};

export const initializeChessboard = () => {
    return {
        type: INITIALIZE_BOARD,
        payload: DEFAULT_CHESSBOARD
    }
};

export const selectPiece = (squareName) => {
    return {
        type: SELECT_PIECE,
        payload: {
            squareName: squareName
        }
    };
};

export const playTurn = (srcSquareName, destSquareName, piece) => {
    return {
        type: PLAY_TURN,
        payload: {
            source: {
                squareName: srcSquareName
            },
            destination: {
                squareName: destSquareName,
                newPiece: piece
            }
        }
    };
};

export const showPawnPromotionModal = (srcSquareName, destSquareName, piece) => {
    return {
        type: SHOW_PAWN_PROMOTION_MODAL,
        payload: {
            source: {
                squareName: srcSquareName
            },
            destination: {
                squareName: destSquareName,
                newPiece: piece
            }
        }
    };
};

export const cancelPawnPromotionModal = () => {
    return {
        type: CANCEL_PAWN_PROMOTION_MODAL
    };
};

export const restartGame = () => {
    return {
        type: RESTART_GAME,
        payload: DEFAULT_CHESSBOARD
    };
};