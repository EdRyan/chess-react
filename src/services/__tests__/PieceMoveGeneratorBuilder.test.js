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