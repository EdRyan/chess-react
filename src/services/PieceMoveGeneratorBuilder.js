import Scenario from "./Scenario";
import {PathMoveCalculator} from "./PathMoveCalculator";
import {HORIZONTAL, VERTICAL, DIAGONAL} from "./pathDirections";
import {DiscreteMoveCalculator} from "./DiscreteMoveCalculator";
import {squareNameToArrayIndices} from "../helpers";
import MovePieceScenario from "./MovePieceScenario";
import {InCheckScenarioEvaluator} from "./InCheckScenarioEvaluator";

class PieceMoveGenerator {
    constructor(scenario, piece, x, y) {
        if (this.getUnfilteredMoves === undefined) {
            throw new TypeError("Must override getUnfilteredMoves");
        }

        this.scenario = scenario;
        this.piece = piece;
        this.x = x;
        this.y = y;
    }

    getLegalMoves() {
        const moves = this.getUnfilteredMoves();

        return moves.filter(([x, y]) => {
            const movePieceScenario = new MovePieceScenario(this.scenario.board, this.scenario.getEnPassantSquareName());
            movePieceScenario.from(this.x, this.y).to(x, y).evaluate();

            const scEvaluator = new InCheckScenarioEvaluator(movePieceScenario);
            return !scEvaluator.isInCheck(this.piece.color);
        });
    }
}


class PawnMoveGenerator extends PieceMoveGenerator {
    getUnfilteredMoves() {
        const moves = [];

        const dmc = new DiscreteMoveCalculator(this.scenario);

        moves.push(...dmc.getMoves(
            this.piece,
            this.x,
            this.y,
            piece => !piece,
            [ [0,1] ]
        ));

        const initialPawnRow = this.piece.color === 'white' ? 1 : 6;
        if (this.y === initialPawnRow && moves.length === 1) {
            moves.push(...dmc.getMoves(
                this.piece,
                this.x,
                this.y,
                piece => !piece,
                [ [0,2] ]
            ));
        }

        // takes
        const takes = [ [-1,1], [1,1] ];
        moves.push(...dmc.getMoves(
            this.piece,
            this.x,
            this.y,
            piece => piece && piece.color !== this.piece.color,
            takes
        ));

        // en passant
        const epSquareName = this.scenario.getEnPassantSquareName();
        if (epSquareName) {
            const rivalPawn = this.scenario.getPieceAtName(epSquareName);
            // sanity check below
            if (rivalPawn.type === 'pawn' && rivalPawn.color !== this.piece.color) {
                const [epX, epY] = squareNameToArrayIndices(epSquareName);
                if (epY === this.y && (epX === this.x-1 || epX === this.x+1)) {
                    const deltaY = this.piece.color === 'white' ? 1 : -1;
                    moves.push([epX,epY + deltaY]);
                }
            }
        }

        return moves;
    }
}

class KnightMoveGenerator extends PieceMoveGenerator {
    getUnfilteredMoves() {
        const offsets = [[1, 2], [-1, 2], [2, 1], [-2, 1], [1, -2], [-1, -2], [2, -1], [-2, -1]];

        return new DiscreteMoveCalculator(this.scenario).getMoves(
            this.piece,
            this.x,
            this.y,
            piece => !piece || piece.color !== this.piece.color,
            offsets
        );
    }
}

class RookMoveGenerator extends PieceMoveGenerator {
    getUnfilteredMoves() {
        return new PathMoveCalculator(this.scenario).getMoves(
            this.piece,
            this.x,
            this.y,
                piece => piece.color !== this.piece.color,
            HORIZONTAL, VERTICAL
        );
    }
}

class BishopMoveGenerator extends PieceMoveGenerator {
    getUnfilteredMoves() {
        return new PathMoveCalculator(this.scenario).getMoves(
            this.piece,
            this.x,
            this.y,
            piece => piece.color !== this.piece.color,
            DIAGONAL
        );
    }
}

class QueenMoveGenerator extends PieceMoveGenerator {
    getUnfilteredMoves() {
        return new PathMoveCalculator(this.scenario).getMoves(
            this.piece,
            this.x,
            this.y,
            piece => piece.color !== this.piece.color,
            HORIZONTAL, VERTICAL, DIAGONAL
        );
    }
}

class KingMoveGenerator extends PieceMoveGenerator {
    getUnfilteredMoves() {
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

        const dmc = new DiscreteMoveCalculator(this.scenario);

        moves.push(...dmc.getMoves(
            this.piece,
            this.x,
            this.y,
            piece => !piece || piece.color !== this.piece.color,
            possibleMoves
        ));

        // castling
        if (!this.piece.hasMoved) {
            const leftRook = this.scenario.getPieceAt(0,this.y);
            const rightRook = this.scenario.getPieceAt(7,this.y);

            if (leftRook && !leftRook.hasMoved)
            {
                if (this._rowIsOpen(1,this.x-1,this.y)) {
                    let underAttack = false;
                    for (let i=0; i <= 2; i++) {
                        const kingMoveScenario = new MovePieceScenario(this.scenario.board, this.enPassantSquareName); // todo clean up usage of scenario.board
                        kingMoveScenario.from(this.x,this.y).to(this.x-i,this.y).evaluate();

                        const scEvaluator = new InCheckScenarioEvaluator(kingMoveScenario);

                        underAttack = underAttack || scEvaluator.isInCheck(this.piece.color);
                        if (underAttack) {
                            break;
                        }
                    }

                    if (!underAttack) {
                        moves.push([0,this.y]);
                    }
                }
            }

            if (rightRook && !rightRook.hasMoved)
            {
                if (this._rowIsOpen(this.x+1,6,this.y)) {
                    let underAttack = false;
                    for (let i=0; i <= 2; i++) {
                        const kingMoveScenario = new MovePieceScenario(this.scenario.board, this.scenario.getEnPassantSquareName()); // todo clean up usage of scenario.board
                        kingMoveScenario.from(this.x,this.y).to(this.x+i,this.y).evaluate();

                        const scEvaluator = new InCheckScenarioEvaluator(kingMoveScenario);

                        underAttack = underAttack || scEvaluator.isInCheck(this.piece.color);
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

    _rowIsOpen(startX,endX,y) {
        let open = true;
        for (let x=startX; x <= endX; x++) {
            if (this.scenario.getPieceAt(x, y)) {
                open = false;
                break;
            }
        }
        return open;
    }
}




export default class PieceMoveGeneratorBuilder {

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

    forScenario(scenario) {
        this.scenario = scenario;
        return this;
    }

    havingMoved(hasMoved) {
        this.hasMoved = hasMoved;
        return this;
    }

    withPossibleEnPassantAt(squareName) {
        this.enPassantSquareName = squareName;
        return this;
    }

    forPiece(piece) {
        this.pieceType = piece.type;
        this.color = piece.color;
        this.hasMoved = piece.hasMoved;
        return this;
    }

    build() {

        if (!this.pieceType) throw new RangeError("Missing piece type");
        if (!this.color) throw new RangeError("Missing color");
        if (this.x === undefined || this.y === undefined) throw new RangeError("Missing starting square");
        if (!this.board && !this.scenario) throw new RangeError("Missing board or scenario");

        if (!this.scenario) {
            this.scenario = new Scenario(this.board, this.enPassantSquareName);
        }

        const piece = { type: this.pieceType, color: this.color, hasMoved: this.hasMoved };

        switch (this.pieceType) {
            case 'pawn':
                return new PawnMoveGenerator(this.scenario, piece, this.x, this.y);
            case 'knight':
                return new KnightMoveGenerator(this.scenario, piece, this.x, this.y);
            case 'rook':
                return new RookMoveGenerator(this.scenario, piece, this.x, this.y);
            case 'bishop':
                return new BishopMoveGenerator(this.scenario, piece, this.x, this.y);
            case 'queen':
                return new QueenMoveGenerator(this.scenario, piece, this.x, this.y);
            case 'king':
                return new KingMoveGenerator(this.scenario, piece, this.x, this.y);
            default:
                throw new RangeError("Invalid piece type specified");
        }
    }

}