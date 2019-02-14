import MoveBuilder from "../MoveBuilder";
import {arrayIndicesToSquareName, squareNameToArrayIndices} from "../helpers";

export const getAllowedMoves = (board, squareName) => {

    if (!squareName) {
        return [];
    }

    const [x,y] = squareNameToArrayIndices(squareName);
    const piece = board[x][y];

    if (!piece) {
        return [];
    }

    const allowedMoves = new MoveBuilder()
        .forPieceType(piece.type)
        .ofColor(piece.color)
        .atPosition(x,y)
        .onBoard(board)
        .havingMoved(piece.hasMoved)
        .getAllowedMoves();

    return allowedMoves.map(([a,b]) => arrayIndicesToSquareName([a,b]));
};

export const getCheckStatus = (board, color) => {

    const moveBuilder = new MoveBuilder().onBoard(board);

    const [kingX, kingY] = moveBuilder.findKing(board, color);

    const attackingColor = color === 'white' ? 'black' : 'white';

    const isInCheck = moveBuilder.isUnderAttack(kingX, kingY, attackingColor);

    const movesAvailable = [...Array(8).keys()].some(x => {
        return [...Array(8).keys()].some(y => {
            const piece = board[x][y];

            if (!piece || piece.color !== color) {
                return false;
            }

            return new MoveBuilder()
                .forPieceType(piece.type)
                .ofColor(piece.color)
                .atPosition(x,y)
                .onBoard(board)
                .havingMoved(piece.hasMoved)
                .getAllowedMoves()
                .length > 0;
        })
    });

    if (movesAvailable) {
        return isInCheck ? 'check' : false;
    } else {
        return isInCheck ? 'checkmate' : 'stalemate';
    }
};