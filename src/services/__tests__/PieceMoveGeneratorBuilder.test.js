import PieceMoveGeneratorBuilder from "../PieceMoveGeneratorBuilder";
import TestScenario from "../__testHelpers__/TestScenario";
import {arrayIndicesToSquareName} from "../../helpers";

const checkMoves = (returnedMoves=[], expectedMoves=[]) => {
    expect(returnedMoves.sort()).toEqual(expectedMoves.sort());
};

const getMoves = (scenario, squareName) => {
    const piece = scenario.getPieceAtName(squareName);

    return new PieceMoveGeneratorBuilder()
        .forPiece(piece)
        .atSquareName(squareName)
        .forScenario(scenario)
        .withPossibleEnPassantAt(scenario.enPassantSquareName)
        .build()
        .getLegalMoves()
        .map(([a,b]) => arrayIndicesToSquareName([a,b]));
};

describe('Initial chessboard', () => {

    const buildScenario = () => {
        const s = new TestScenario();
        s.__setPiece('a2','pawn','white','false');
        s.__setPiece('b2','pawn','white','false');
        s.__setPiece('c2','pawn','white','false');
        s.__setPiece('d2','pawn','white','false');
        s.__setPiece('e2','pawn','white','false');
        s.__setPiece('f2','pawn','white','false');
        s.__setPiece('g2','pawn','white','false');
        s.__setPiece('h2','pawn','white','false');
        s.__setPiece('a1','rook','white','false');
        s.__setPiece('b1','knight','white','false');
        s.__setPiece('c1','bishop','white','false');
        s.__setPiece('d1','queen','white','false');
        s.__setPiece('e1','king','white','false');
        s.__setPiece('f1','bishop','white','false');
        s.__setPiece('g1','knight','white','false');
        s.__setPiece('h1','rook','white','false');
        s.__setPiece('a7','pawn','black','false');
        s.__setPiece('b7','pawn','black','false');
        s.__setPiece('c7','pawn','black','false');
        s.__setPiece('d7','pawn','black','false');
        s.__setPiece('e7','pawn','black','false');
        s.__setPiece('f7','pawn','black','false');
        s.__setPiece('g7','pawn','black','false');
        s.__setPiece('h7','pawn','black','false');
        s.__setPiece('a8','rook','black','false');
        s.__setPiece('b8','knight','black','false');
        s.__setPiece('c8','bishop','black','false');
        s.__setPiece('d8','queen','black','false');
        s.__setPiece('e8','king','black','false');
        s.__setPiece('f8','bishop','black','false');
        s.__setPiece('g8','knight','black','false');
        s.__setPiece('h8','rook','black','false');
        return s;
    };

    it('Should calculate white pawn moves', () => {
        const s = buildScenario();
        checkMoves(getMoves(s,'a2'), ['a3','a4']);
        checkMoves(getMoves(s,'b2'), ['b3','b4']);
        checkMoves(getMoves(s,'c2'), ['c3','c4']);
        checkMoves(getMoves(s,'d2'), ['d3','d4']);
        checkMoves(getMoves(s,'e2'), ['e3','e4']);
        checkMoves(getMoves(s,'f2'), ['f3','f4']);
        checkMoves(getMoves(s,'g2'), ['g3','g4']);
        checkMoves(getMoves(s,'h2'), ['h3','h4']);
    });

    it('Should calculate black pawn moves', () => {
        const s = buildScenario();
        checkMoves(getMoves(s,'a7'), ['a6','a5']);
        checkMoves(getMoves(s,'b7'), ['b6','b5']);
        checkMoves(getMoves(s,'c7'), ['c6','c5']);
        checkMoves(getMoves(s,'d7'), ['d6','d5']);
        checkMoves(getMoves(s,'e7'), ['e6','e5']);
        checkMoves(getMoves(s,'f7'), ['f6','f5']);
        checkMoves(getMoves(s,'g7'), ['g6','g5']);
        checkMoves(getMoves(s,'h7'), ['h6','h5']);
    });

    it('Should calculate a1 rook moves', () => {
        const s = buildScenario();
        const moves = getMoves(s,'a1');
        checkMoves(moves, []);
    });

    it('Should calculate b1 knight moves', () => {
        const s = buildScenario();
        const moves = getMoves(s,'b1');
        checkMoves(moves, ['a3','c3']);
    });

    it('Should calculate c1 bishop moves', () => {
        const s = buildScenario();
        const moves = getMoves(s,'c1');
        checkMoves(moves, []);
    });

    it('Should calculate d1 queen moves', () => {
        const s = buildScenario();
        const moves = getMoves(s,'d1');
        checkMoves(moves, []);
    });

    it('Should calculate e1 king moves', () => {
        const s = buildScenario();
        const moves = getMoves(s,'e1');
        checkMoves(moves, []);
    });

    it('Should calculate f1 bishop moves', () => {
        const s = buildScenario();
        const moves = getMoves(s,'f1');
        checkMoves(moves, []);
    });

    it('Should calculate g1 knight moves', () => {
        const s = buildScenario();
        const moves = getMoves(s,'g1');
        checkMoves(moves, ['f3','h3']);
    });

    it('Should calculate h1 rook moves', () => {
        const s = buildScenario();
        const moves = getMoves(s,'h1');
        checkMoves(moves, []);
    });

    it('Should calculate a8 rook moves', () => {
        const s = buildScenario();
        const moves = getMoves(s,'a8');
        checkMoves(moves, []);
    });

    it('Should calculate b8 knight moves', () => {
        const s = buildScenario();
        const moves = getMoves(s,'b8');
        checkMoves(moves, ['a6','c6']);
    });

    it('Should calculate c8 bishop moves', () => {
        const s = buildScenario();
        const moves = getMoves(s,'c8');
        checkMoves(moves, []);
    });

    it('Should calculate d8 queen moves', () => {
        const s = buildScenario();
        const moves = getMoves(s,'d8');
        checkMoves(moves, []);
    });

    it('Should calculate e8 king moves', () => {
        const s = buildScenario();
        const moves = getMoves(s,'e8');
        checkMoves(moves, []);
    });

    it('Should calculate f8 bishop moves', () => {
        const s = buildScenario();
        const moves = getMoves(s,'f8');
        checkMoves(moves, []);
    });

    it('Should calculate g8 knight moves', () => {
        const s = buildScenario();
        const moves = getMoves(s,'g8');
        checkMoves(moves, ['f6','h6']);
    });

    it('Should calculate h8 rook moves', () => {
        const s = buildScenario();
        const moves = getMoves(s,'h8');
        checkMoves(moves, []);
    });

});

// http://www.thechesswebsite.com/bestmove20/
describe('Board as of The Chess Website #20', () => {

    const buildScenario = () => {
        const s = new TestScenario();
        s.__setPiece('d8', 'rook', 'black');
        s.__setPiece('b7', 'bishop', 'black');
        s.__setPiece('d7', 'rook', 'black');
        s.__setPiece('e7', 'bishop', 'black');
        s.__setPiece('g7', 'king', 'black');
        s.__setPiece('a6', 'pawn', 'black');
        s.__setPiece('h6', 'pawn', 'black');
        s.__setPiece('a5', 'pawn', 'white');
        s.__setPiece('f5', 'pawn', 'white');
        s.__setPiece('b4', 'pawn', 'black');
        s.__setPiece('d4', 'pawn', 'black');
        s.__setPiece('f4', 'pawn', 'black');
        s.__setPiece('b3', 'pawn', 'white');
        s.__setPiece('d3', 'bishop', 'white');
        s.__setPiece('c2', 'rook', 'white');
        s.__setPiece('f2', 'bishop', 'white');
        s.__setPiece('h2', 'pawn', 'white', false);
        s.__setPiece('e1', 'rook', 'white');
        s.__setPiece('g1', 'king', 'white');
        return s;
    };

    it('Should calculate d8 rook moves', () => {
        const s = buildScenario();
        const moves = getMoves(s,'d8');
        checkMoves(moves, ['a8','b8','c8','e8','f8','g8','h8']);
    });

    it('Should calculate b7 bishop moves', () => {
        const s = buildScenario();
        const moves = getMoves(s,'b7');
        checkMoves(moves, ['a8','c6','d5','e4','f3','g2','h1','c8']);
    });

    it('Should calculate d7 rook moves', () => {
        const s = buildScenario();
        const moves = getMoves(s,'d7');
        checkMoves(moves, ['c7','d6','d5']);
    });

    it('Should calculate e7 bishop moves', () => {
        const s = buildScenario();
        const moves = getMoves(s,'e7');
        checkMoves(moves, ['f8','d6','c5','f6','g5','h4']);
    });

    it('Should calculate g7 king moves', () => {
        const s = buildScenario();
        const moves = getMoves(s,'g7');
        checkMoves(moves, ['f8','g8','h8','h7','f6','f7']);
    });

    it('Should calculate a6 pawn moves', () => {
        const s = buildScenario();
        const moves = getMoves(s,'a6');
        checkMoves(moves, []);
    });

    it('Should calculate h6 pawn moves', () => {
        const s = buildScenario();
        const moves = getMoves(s,'h6');
        checkMoves(moves, ['h5']);
    });

    it('Should calculate a5 pawn moves', () => {
        const s = buildScenario();
        const moves = getMoves(s,'a5');
        checkMoves(moves, []);
    });

    it('Should calculate f5 pawn moves', () => {
        const s = buildScenario();
        const moves = getMoves(s,'f5');
        checkMoves(moves, ['f6']);
    });

    it('Should calculate b4 pawn moves', () => {
        const s = buildScenario();
        const moves = getMoves(s,'b4');
        checkMoves(moves, []);
    });

    it('Should calculate d4 pawn moves', () => {
        const s = buildScenario();
        const moves = getMoves(s,'d4');
        checkMoves(moves, []);
    });

    it('Should calculate f4 pawn moves', () => {
        const s = buildScenario();
        const moves = getMoves(s,'f4');
        checkMoves(moves, ['f3']);
    });

    it('Should calculate b3 pawn moves', () => {
        const s = buildScenario();
        const moves = getMoves(s,'b3');
        checkMoves(moves, []);
    });

    it('Should calculate d3 bishop moves', () => {
        const s = buildScenario();
        const moves = getMoves(s,'d3');
        checkMoves(moves, ['e4','a6','b5','c4','e2','f1']);
    });

    it('Should calculate c2 rook moves', () => {
        const s = buildScenario();
        const moves = getMoves(s,'c2');
        checkMoves(moves, ['c8','c7','c6','c5','c4','c3','c1','a2','b2','d2','e2']);
    });

    it('Should calculate f2 bishop moves', () => {
        const s = buildScenario();
        const moves = getMoves(s,'f2');
        checkMoves(moves, ['d4','e3','g3','h4']);
    });

    it('Should calculate h2 pawn moves', () => {
        const s = buildScenario();
        const moves = getMoves(s,'h2');
        checkMoves(moves, ['h3','h4']);
    });

    it('Should calculate e1 rook moves', () => {
        const s = buildScenario();
        const moves = getMoves(s,'e1');
        checkMoves(moves, ['a1','b1','c1','d1','f1','e2','e3','e4','e5','e6','e7']);
    });

    it('Should calculate g1 king moves', () => {
        const s = buildScenario();
        const moves = getMoves(s,'g1');
        checkMoves(moves, ['f1']);
    });

});