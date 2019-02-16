import {arrayIndicesToSquareName, squareNameToArrayIndices} from "../helpers";
import PieceMoveGeneratorBuilder from "../services/PieceMoveGeneratorBuilder";
import Scenario from "../services/Scenario";
import {InCheckScenarioEvaluator} from "../services/InCheckScenarioEvaluator";
import {PlayerMoveGenerator} from "../services/PlayerMoveGenerator";

export const getAllowedMoves = (board, squareName, enPassantSquareName) => {

    if (!squareName) {
        return [];
    }

    const [x,y] = squareNameToArrayIndices(squareName);
    const piece = board[x][y];

    if (!piece) {
        return [];
    }

    const allowedMoves = new PieceMoveGeneratorBuilder()
        .forPiece(piece)
        .atPosition(x,y)
        .onBoard(board)
        .withPossibleEnPassantAt(enPassantSquareName)
        .build()
        .getLegalMoves();

    return allowedMoves.map(([a,b]) => arrayIndicesToSquareName([a,b]));
};

export const getCheckStatus = (board, color, enPassantSquareName) => {
    const scenario = new Scenario(board, enPassantSquareName);
    const checkEvaluator = new InCheckScenarioEvaluator(scenario);
    const isInCheck = checkEvaluator.isInCheck(color);

    const pmGenerator = new PlayerMoveGenerator(scenario);
    const hasMoves = pmGenerator.hasAnyMoves(color);

    if (hasMoves) {
        return isInCheck ? 'check' : false;
    } else {
        return isInCheck ? 'checkmate' : 'stalemate';
    }
};