import MoveCalculator from "./MoveCalculator";

export class DiscreteMoveCalculator extends MoveCalculator {

    getMoves(piece, x, y, fnInclude, offsets) {

        const moves = [];

        for (let i = 0; i < offsets.length; i++) {
            const indices = this._convertOffsetToIndices(piece, x, y, offsets[i]);
            const inBounds = this._isInBounds(indices);

            if (!inBounds) continue;

            const curPiece = this.scenario.getPieceAt(indices[0], indices[1]);

            if (fnInclude && fnInclude(curPiece)) {
                moves.push(indices);
            }
        }

        return moves;
    }

}