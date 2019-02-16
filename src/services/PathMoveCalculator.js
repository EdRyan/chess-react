import MoveCalculator from "./MoveCalculator";
import { HORIZONTAL, VERTICAL, DIAGONAL } from "./pathDirections";

export class PathMoveCalculator extends MoveCalculator {

    getMoves(piece, x, y, fnIncludeLast, directions) {

        const moves = [];

        for (let i = 4; i < arguments.length; i++) {
            const direction = arguments[i];

            switch (direction) {
                case HORIZONTAL:
                    moves.push(...this._getHorizontalMoves(piece, x, y, fnIncludeLast));
                    break;
                case VERTICAL:
                    moves.push(...this._getVerticalMoves(piece, x, y, fnIncludeLast));
                    break;
                case DIAGONAL:
                    moves.push(...this._getDiagonalMoves(piece, x, y, fnIncludeLast));
                    break;
                default:
                    throw new RangeError("Invalid direction specified");
            }
        }

        return moves;
    }

    _getHorizontalMoves(piece, x, y, fnIncludeLast) {
        const directions = [
            [1,0], // right
            [-1,0], // left
        ];

        return this._getMovesInDirections(piece, x, y, directions, fnIncludeLast);
    }

    _getVerticalMoves(piece, x, y, fnIncludeLast) {
        const directions = [
            [0,1], // up
            [0,-1], // down
        ];

        return this._getMovesInDirections(piece, x, y, directions, fnIncludeLast);
    }

    _getDiagonalMoves(piece, x, y, fnIncludeLast) {
        const directions = [
            [1,1], // up right
            [1,-1], // down right
            [-1,1], // up left
            [-1,-1] // down left
        ];

        return this._getMovesInDirections(piece, x, y, directions, fnIncludeLast);
    }

    _getMovesInDirections(piece, x, y, offsets, fnIncludeLast) {
        const moves = [];

        for (let i = 0; i < offsets.length; i++) {
            const offset = offsets[i];
            moves.push(...this._getMovesInDirection(piece, x, y, offset, fnIncludeLast))
        }

        return moves;
    }

    _getMovesInDirection(piece, x, y, offset, fnIncludeLast) {
        const [deltaX, deltaY] = offset;
        return this._computeMovesUntilBlocked(piece, x, y,
            [...Array(7).keys()]
                .map(key => [(key + 1)*deltaX,(key + 1)*deltaY])
            , fnIncludeLast);
    }

    _computeMovesUntilBlocked(piece, x, y, array, fnIncludeLast) {
        const moves = [];

        for (let i = 0; i < array.length; i++) {
            const indices = this._convertOffsetToIndices(piece, x, y, array[i]);

            const inBounds = this._isInBounds(indices);

            if (!inBounds) break;

            const curPiece = this.scenario.getPieceAt(indices[0], indices[1]);

            if (curPiece) {
                if (fnIncludeLast && fnIncludeLast(curPiece))
                {
                    moves.push(indices);
                }
                break;
            } else {
                moves.push(indices);
            }
        }

        return moves;
    }

}