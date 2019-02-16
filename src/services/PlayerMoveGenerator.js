import PieceMoveGeneratorBuilder from "./PieceMoveGeneratorBuilder";
import {arrayIndicesToSquareName} from "../helpers";

export class PlayerMoveGenerator {

    constructor(scenario) {
        this.scenario = scenario;
    }

    getMoves(player) {
        const moves = {};

        for (let x = 0; x < 8; x++) {
            for (let y = 0; y < 8; y++) {
                const piece = this.scenario.getPieceAt(x, y);
                if (piece && piece.color === player) {
                    const squareName = arrayIndicesToSquareName([x,y]);
                    moves[squareName] = new PieceMoveGeneratorBuilder()
                        .forPiece(piece)
                        .atPosition(x,y)
                        .forScenario(this.scenario)
                        .build()
                        .getLegalMoves();
                }
            }
        }

        return moves;
    }

    hasAnyMoves(player) {
        for (let x = 0; x < 8; x++) {
            for (let y = 0; y < 8; y++) {
                const piece = this.scenario.getPieceAt(x, y);
                if (piece && piece.color === player) {
                    const moves = new PieceMoveGeneratorBuilder()
                        .forPiece(piece)
                        .atPosition(x,y)
                        .forScenario(this.scenario)
                        .build()
                        .getLegalMoves();

                    if (moves.length > 0) {
                        return true;
                    }
                }
            }
        }
        return false;
    }
}