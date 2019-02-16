import PieceMoveGeneratorBuilder from "./PieceMoveGeneratorBuilder";

export class InCheckScenarioEvaluator {

    constructor(scenario) {
        this.scenario = scenario;
    }

    _findKing(player) {
        let kingX = -1;
        let kingY = -1;

        for (let x = 0; x < 8; x++) {
            for (let y = 0; y < 8; y++) {
                const piece = this.scenario.getPieceAt(x,y);
                if (piece && piece.type === 'king' && piece.color === player) {
                    kingX = x;
                    kingY = y;
                    break;
                }
            }
            if (kingX >= 0) {
                break;
            }
        }

        return [kingX, kingY];
    }

    isInCheck(player) {
        const [kingX, kingY] = this._findKing(player);

        return [...Array(8).keys()].some(row => {
            const otherY = 7-row;
            return [...Array(8).keys()].some(otherX => {
                const piece = this.scenario.getPieceAt(otherX,otherY);

                if (!piece || piece.color === player) {
                    return false;
                }

                // TODO determine if we need withPossibleEnPassantAt here
                // I think it should not be necessary because it only affects pawns
                return new PieceMoveGeneratorBuilder()
                    .forPiece(piece)
                    .atPosition(otherX, otherY)
                    .forScenario(this.scenario)
                    .build()
                    .getUnfilteredMoves()
                    .some(([a,b]) => a === kingX && b === kingY);
            })
        })
    }

}