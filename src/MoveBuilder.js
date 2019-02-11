class MoveBuilder {

    forPieceType(pieceType) {
        this.pieceType = pieceType;
        return this;
    }

    ofColor(color) {
        this.color = color;
        return this;
    }

    atPosition(x,y) {
        this.x = x;
        this.y = y;
        return this;
    }

    onBoard(board) {
        this.board = board;
        return this;
    }

    getAllowedMoves() {

        // TODO check required setup has been made

        switch (this.pieceType) {
            case 'pawn':
                return this._getAllowedPawnMoves();
            default:
                return [];
        }
    }

    _getAllowedPawnMoves() {
        const moves = [];

        const forwardMoves = [ [0,1] ];
        const initialPawnRow = this.color === 'white' ? 1 : 6;
        if (this.y === initialPawnRow) {
            forwardMoves.push([0,2]);
        }

        const newMoves = this._computeMovesUntilBlocked(forwardMoves);

        moves.push(...newMoves);

        // takes
        const takes = [ [-1,1], [1,1] ];

        const newTakes = takes
            .map(o => this._convertOffsetToIndices(o))
            .filter(
                indices => this._isInBounds(indices) &&
                    this._isOccupiedByEnemy(indices)
            );

        moves.push(...newTakes);

        return moves;
    };

    _computeMovesUntilBlocked(array) {
        const moves = [];

        for (let i = 0; i < array.length; i++) {
            const indices = this._convertOffsetToIndices(array[i]);
            if (this._isOccupied(indices) || !this._isInBounds(indices)) {
                break;
            } else {
                moves.push(indices);
            }
        }

        return moves;
    }

    _isOccupied([x,y]) {
        return this.board[x][y] !== null;
    }

    _isOccupiedByEnemy([x,y]) {
        const piece = this.board[x][y];
        return piece && piece.color !== this.color;
    }

    _convertOffsetToIndices([deltaX, deltaY]) {
        const factor = this.color === 'black' ? -1 : 1;  // flip 180 degrees for black

        return [this.x + deltaX * factor, this.y + deltaY * factor];
    }

    _isInBounds([x,y]) {
        return x >= 0 && x <= 7 && y >= 0 && y <= 7;
    }
}

export default MoveBuilder;