import _ from 'lodash';

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

    havingMoved(hasMoved) {
        this.hasMoved = hasMoved;
        return this;
    }

    getAllowedMoves() {

        // TODO check required setup has been made

        return this._getAllowedMoves(0);
    }

    _getAllowedMoves(level) {
        this.recurrenceLevel = level;

        const moves = this._getAllowedMovesForType();

        if (level === 0) {
            return this._removeKingUnderAttackSquares(moves);
        }

        return moves;
    }

    _getAllowedMovesForType() {

        switch (this.pieceType) {
            case 'pawn':
                return this._getAllowedPawnMoves();
            case 'knight':
                return this._getAllowedKnightMoves();
            case 'rook':
                return this._getAllowedRookMoves();
            case 'bishop':
                return this._getAllowedBishopMoves();
            case 'queen':
                return this._getAllowedQueenMoves();
            case 'king':
                return this._getAllowedKingMoves();
            default:
                return [];
        }
    }

     _removeUnderAttackSquares(moves) {
        const attackingColor = this.color === 'white' ? 'black' : 'white';
        return moves.filter(([x, y]) => {
            const newBoard = this._getNewBoard(x,y);
            return !this.isUnderAttack(x, y, attackingColor, newBoard);
        });
    }

    _removeKingUnderAttackSquares(moves) {
        const attackingColor = this.color === 'white' ? 'black' : 'white';

        let kingX = -1;
        let kingY = -1;

        if (this.pieceType !== 'king') {
            [kingX, kingY] = this.findKing(this.board, this.color);
        }

        return moves.filter(([x, y]) => {
            const newBoard = this._getNewBoard(x,y);
            const checkX = kingX >= 0 ? kingX : x;
            const checkY = kingY >= 0 ? kingY : y;
            const underAttack = this.isUnderAttack(checkX, checkY, attackingColor, newBoard);
            return !underAttack;
        });
    }

    findKing(board, color) {
        let kingX = -1;
        let kingY = -1;

        for (let x = 0; x < 8; x++) {
            for (let y = 0; y < 8; y++) {
                const piece = board[x][y];
                if (piece && piece.type === 'king' && piece.color === color) {
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

    _getAllowedPawnMoves() {
        const moves = [];

        const forwardMoves = [ [0,1] ];
        const initialPawnRow = this.color === 'white' ? 1 : 6;
        if (this.y === initialPawnRow) {
            forwardMoves.push([0,2]);
        }

        const newMoves = this._computeMovesUntilBlocked(forwardMoves, false);

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

    _getAllowedKnightMoves() {
        const moves = [];

        const jumps = [ [1,2],[-1,2],[2,1],[-2,1],[1,-2],[-1,-2],[2,-1],[-2,-1] ];

        const newMoves = jumps
            .map(o => this._convertOffsetToIndices(o))
            .filter(indices => this._isInBounds(indices) &&
                !this._isOccupiedByFriend(indices));

        moves.push(...newMoves);

        return moves;
    }

    _getAllowedRookMoves() {
        const moves = [];

        const lateralMoves = this._getLateralMoves();
        moves.push(...lateralMoves);

        return moves;
    }

    _getLateralMoves() {
        const moves = [];

        const up = [...Array(7).keys()]
            .map(key => [0,key + 1]);
        const upMoves = this._computeMovesUntilBlocked(up, (indices) => {
            return this._isOccupiedByEnemy(indices);
        });
        moves.push(...upMoves);

        const down = [...Array(7).keys()]
            .map(key => [0,-key - 1]);
        const downMoves = this._computeMovesUntilBlocked(down, (indices) => {
            return this._isOccupiedByEnemy(indices);
        });
        moves.push(...downMoves);

        const right = [...Array(7).keys()]
            .map(key => [key + 1,0]);
        const rightMoves = this._computeMovesUntilBlocked(right, (indices) => {
            return this._isOccupiedByEnemy(indices);
        });
        moves.push(...rightMoves);

        const left = [...Array(7).keys()]
            .map(key => [-key - 1,0]);
        const leftMoves = this._computeMovesUntilBlocked(left, (indices) => {
            return this._isOccupiedByEnemy(indices);
        });
        moves.push(...leftMoves);

        return moves;
    }

    _getAllowedBishopMoves() {
        const moves = [];

        const diagonalMoves = this._getDiagonalMoves();
        moves.push(...diagonalMoves);

        return moves;
    }

    _getDiagonalMoves() {
        const moves = [];

        const upRight = [...Array(7).keys()]
            .map(key => [key + 1,key + 1]);
        const upRightMoves = this._computeMovesUntilBlocked(upRight, (indices) => {
            return this._isOccupiedByEnemy(indices);
        });
        moves.push(...upRightMoves);

        const downRight = [...Array(7).keys()]
            .map(key => [key + 1,-key - 1]);
        const downRightMoves = this._computeMovesUntilBlocked(downRight, (indices) => {
            return this._isOccupiedByEnemy(indices);
        });
        moves.push(...downRightMoves);

        const upLeft = [...Array(7).keys()]
            .map(key => [-key - 1,key + 1]);
        const upLeftMoves = this._computeMovesUntilBlocked(upLeft, (indices) => {
            return this._isOccupiedByEnemy(indices);
        });
        moves.push(...upLeftMoves);

        const downLeft = [...Array(7).keys()]
            .map(key => [-key - 1,-key - 1]);
        const downLeftMoves = this._computeMovesUntilBlocked(downLeft, (indices) => {
            return this._isOccupiedByEnemy(indices);
        });
        moves.push(...downLeftMoves);

        return moves;
    }

    _getAllowedQueenMoves() {
        return this._getLateralMoves().concat(this._getDiagonalMoves());
    }

    _getAllowedKingMoves() {
        const moves = [];

        const possibleMoves = [
            [0,1],
            [1,1],
            [1,0],
            [0,-1],
            [1,-1],
            [-1,0],
            [-1,1],
            [-1,-1]
        ];

        const newMoves = possibleMoves
            .map(o => this._convertOffsetToIndices(o))
            .filter(indices => this._isInBounds(indices) &&
                !this._isOccupiedByFriend(indices));

        moves.push(...newMoves);

        // castling
        if (!this.hasMoved) {
            const attackingPlayer = this.color === 'white' ? 'black' : 'white';

            // check left rook
            const leftRook = this.board[0][this.y];
            if (leftRook && !leftRook.hasMoved)
            {
                if (this._rowIsOpen(1,this.x-1,this.y)) {
                    let underAttack = false;
                    for (let i=0; i <= 2; i++) {
                        const newBoard = this._getNewBoard(this.x-i,this.y);
                        underAttack = underAttack || this.isUnderAttack(this.x-i,this.y,attackingPlayer,newBoard);
                        if (underAttack) {
                            break;
                        }
                    }

                    if (!underAttack) {
                        moves.push([0,this.y]);
                    }
                }
            }

            // check right rook
            const rightRook = this.board[7][this.y];
            if (rightRook && !rightRook.hasMoved)
            {
                if (this._rowIsOpen(this.x+1,6,this.y)) {
                    let underAttack = false;
                    for (let i=0; i <= 2; i++) {
                        const newBoard = this._getNewBoard(this.x+i,this.y);
                        underAttack = underAttack || this.isUnderAttack(this.x+i,this.y,attackingPlayer,newBoard);
                        if (underAttack) {
                            break;
                        }
                    }

                    if (!underAttack) {
                        moves.push([7,this.y]);
                    }
                }
            }
        }

        return moves;
    }

    _getNewBoard(newX, newY) {
        const newBoard = _.cloneDeep(this.board);
        newBoard[newX][newY] = newBoard[this.x][this.y];
        newBoard[newX][newY].hasMoved = true;
        newBoard[this.x][this.y] = null;
        return newBoard;
    }

    _rowIsOpen(startX,endX,y) {
        let open = true;
        for (let x=startX; x <= endX; x++) {
            if (this.board[x][y]) {
                open = false;
                break;
            }
        }
        return open;
    }

    isUnderAttack(x, y, attackingColor, boardOverride=null) {

        const board = boardOverride || this.board;

        return [...Array(8).keys()].some(row => {
            const otherY = 7-row;
            return [...Array(8).keys()].some(otherX => {
                const piece = board[otherX][otherY];

                if (!piece || piece.color !== attackingColor) {
                    return false;
                }

                return new MoveBuilder()
                    .forPieceType(piece.type)
                    .ofColor(piece.color)
                    .atPosition(otherX,otherY)
                    .onBoard(board)
                    .havingMoved(piece.hasMoved)
                    ._getAllowedMoves(this.recurrenceLevel + 1)
                    .some(([a,b]) => a === x && b === y);
            })
        })
    }

    _computeMovesUntilBlocked(array, includeBlockedSquareCallback=undefined) {
        const moves = [];

        for (let i = 0; i < array.length; i++) {
            const indices = this._convertOffsetToIndices(array[i]);

            const inBounds = this._isInBounds(indices);

            if (!inBounds || this._isOccupied(indices)) {

                if (inBounds && includeBlockedSquareCallback && includeBlockedSquareCallback(indices))
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

    _isOccupied([x,y]) {
        return this.board[x][y] !== null;
    }

    _isOccupiedByEnemy([x,y]) {
        const piece = this.board[x][y];
        return piece && piece.color !== this.color;
    }

    _isOccupiedByFriend([x,y]) {
        const piece = this.board[x][y];
        return piece && piece.color === this.color;
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