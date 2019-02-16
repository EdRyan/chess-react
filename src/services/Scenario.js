import _ from 'lodash';
import {squareNameToArrayIndices} from "../helpers";

export default class Scenario {

    constructor(board, enPassantSquareName) {
        this.board = _.cloneDeep(board);
        this.enPassantSquareName = enPassantSquareName;
    }

    getPieceAt(x,y) {
        return this.board[x][y];
    }

    getPieceAtName(algebraicNotation) {
        const [x, y] = squareNameToArrayIndices(algebraicNotation);
        return this.board[x][y];
    }

    getEnPassantSquareName() {
        return this.enPassantSquareName;
    }

    evaluate() {
        return this;
    }

}