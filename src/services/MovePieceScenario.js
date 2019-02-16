import Scenario from "./Scenario";

export default class MovePieceScenario extends Scenario {

    constructor(board, enPassantSquareName) {
        super(board, enPassantSquareName);
        this.hasEvaluated = false;
    }

    _checkNotEvaluated() {
        if (this.hasEvaluated) throw new Error("Already evaluated scenario");
    }

    from(x,y) {
        this._checkNotEvaluated();
        this.oldX = x;
        this.oldY = y;
        return this;
    }

    to(x,y) {
        this._checkNotEvaluated();
        this.newX = x;
        this.newY = y;
        return this;
    }

    evaluate() {
        if (this.hasEvaluated) return;
        this.board[this.newX][this.newY] = this.board[this.oldX][this.oldY];
        this.board[this.newX][this.newY].hasMoved = true;
        this.board[this.oldX][this.oldY] = null;
        // TODO en passant
        return this;
    }

}