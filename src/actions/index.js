import {UPDATE_BOARD, NEXT_TURN, SELECT_PIECE} from './types';
import {squareNameToArrayIndices, arrayIndicesToSquareName} from "../helpers";
import MoveBuilder from "../MoveBuilder";

const getPiece = (type, color) => { return {type, color}; }

export const initializeChessboard = () => {
    return {
        type: UPDATE_BOARD,
        payload: {
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
        }
    }
};

export const selectPiece = (squareName, piece, board) => {

    const [x,y] = squareNameToArrayIndices(squareName);

    if (!piece) {
        return {
            type: SELECT_PIECE,
            payload: {
                squareName: squareName,
                allowedMoves: []
            }
        };
    }

    const allowedMoves = new MoveBuilder()
        .forPieceType(piece.type)
        .ofColor(piece.color)
        .atPosition(x,y)
        .onBoard(board)
        .getAllowedMoves();

    const allowedMoveNames = allowedMoves.map(([a,b]) => arrayIndicesToSquareName([a,b]));

    return {
        type: SELECT_PIECE,
        payload: {
            squareName: squareName,
            allowedMoves: allowedMoveNames
        }
    };
};

export const nextTurn = () => {
    return {
        type: NEXT_TURN
    }
};