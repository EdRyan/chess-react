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