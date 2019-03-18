import PieceMoveGeneratorBuilder from "../PieceMoveGeneratorBuilder";
import TestScenario from "../__testHelpers__/TestScenario";
import MovePieceScenario from "../MovePieceScenario";
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

// https://lichess.org/editor/rnbqk1nr/1p1pp3/2p2p1b/pP6/6pp/B1N1PQPN/P1PP1PBP/R3K2R_w_KQkq_-
describe('Custom board 1', () => {

    const buildScenario = (enPassant=undefined) => {
        const s = new TestScenario(enPassant);
        s.__setPiece('a8','rook','black',false);
        s.__setPiece('b8','knight','black',false);
        s.__setPiece('c8','bishop','black',false);
        s.__setPiece('d8','queen','black',false);
        s.__setPiece('e8','king','black',false);
        s.__setPiece('g8','knight','black',false);
        s.__setPiece('h8','rook','black',false);
        s.__setPiece('a5','pawn','black',true);
        s.__setPiece('b7','pawn','black',false);
        s.__setPiece('c6','pawn','black',true);
        s.__setPiece('d7','pawn','black',false);
        s.__setPiece('e7','pawn','black',false);
        s.__setPiece('f6','pawn','black',true);
        s.__setPiece('g4','pawn','black',true);
        s.__setPiece('h4','pawn','black',true);
        s.__setPiece('h6','bishop','black',true);
        s.__setPiece('a1','rook','white',false);
        s.__setPiece('e1','king','white',false);
        s.__setPiece('h1','rook','white',false);
        s.__setPiece('a2','pawn','white',false);
        s.__setPiece('c2','pawn','white',false);
        s.__setPiece('d2','pawn','white',false);
        s.__setPiece('f2','pawn','white',false);
        s.__setPiece('h2','pawn','white',false);
        s.__setPiece('g2','bishop','white',true);
        s.__setPiece('a3','bishop','white',true);
        s.__setPiece('c3','knight','white',true);
        s.__setPiece('e3','pawn','white',true);
        s.__setPiece('f3','queen','white',true);
        s.__setPiece('g3','pawn','white',true);
        s.__setPiece('h3','knight','white',true);
        s.__setPiece('b5','pawn','white',true);
        return s;
    };

    it('Should calculate a8 rook moves', () => {
        const s = buildScenario();
        const moves = getMoves(s,'a8');
        checkMoves(moves, ['a7','a6']);
    });

    it('Should calculate b8 knight moves', () => {
        const s = buildScenario();
        const moves = getMoves(s,'b8');
        checkMoves(moves, ['a6']);
    });

    it('Should calculate c8 bishop moves', () => {
        const s = buildScenario();
        const moves = getMoves(s,'c8');
        checkMoves(moves, []);
    });

    it('Should calculate d8 queen moves', () => {
        const s = buildScenario();
        const moves = getMoves(s,'d8');
        checkMoves(moves, ['c7','b6']);
    });

    it('Should calculate e8 king moves', () => {
        const s = buildScenario();
        const moves = getMoves(s,'e8');
        checkMoves(moves, ['f7','f8']);
    });

    it('Should calculate g8 knight moves', () => {
        const s = buildScenario();
        const moves = getMoves(s,'g8');
        checkMoves(moves, []);
    });

    it('Should calculate h8 rook moves', () => {
        const s = buildScenario();
        const moves = getMoves(s,'h8');
        checkMoves(moves, ['h7']);
    });

    it('Should calculate b7 pawn moves', () => {
        const s = buildScenario();
        const moves = getMoves(s,'b7');
        checkMoves(moves, ['b6']);
    });

    it('Should calculate d7 pawn moves', () => {
        const s = buildScenario();
        const moves = getMoves(s,'d7');
        checkMoves(moves, ['d6','d5']);
    });

    it('Should calculate e7 pawn moves', () => {
        const s = buildScenario();
        const moves = getMoves(s,'e7');
        checkMoves(moves, ['e6','e5']);
    });

    it('Should calculate c6 pawn moves', () => {
        const s = buildScenario();
        const moves = getMoves(s,'c6');
        checkMoves(moves, ['b5','c5']);
    });

    it('Should calculate f6 pawn moves', () => {
        const s = buildScenario();
        const moves = getMoves(s,'f6');
        checkMoves(moves, ['f5']);
    });

    it('Should calculate h6 bishop moves', () => {
        const s = buildScenario();
        const moves = getMoves(s,'h6');
        checkMoves(moves, ['g5','f4','e3','g7','f8']);
    });

    it('Should calculate a5 pawn moves', () => {
        const s = buildScenario();
        const moves = getMoves(s,'a5');
        checkMoves(moves, ['a4']);
    });

    it('Should calculate b5 pawn moves', () => {
        const s = buildScenario('a5');
        const moves = getMoves(s,'b5');
        checkMoves(moves, ['a6','b6','c6']);
    });

    it('Should calculate g4 pawn moves', () => {
        const s = buildScenario();
        const moves = getMoves(s,'g4');
        checkMoves(moves, ['f3','h3']);
    });

    it('Should calculate h4 pawn moves', () => {
        const s = buildScenario();
        const moves = getMoves(s,'h4');
        checkMoves(moves, ['g3']);
    });

    it('Should calculate a3 bishop moves', () => {
        const s = buildScenario();
        const moves = getMoves(s,'a3');
        checkMoves(moves, ['b2','c1','b4','c5','d6','e7']);
    });

    it('Should calculate c3 knight moves', () => {
        const s = buildScenario();
        const moves = getMoves(s,'c3');
        checkMoves(moves, ['d5','a4','e4','e2','b1','d1']);
    });

    it('Should calculate e3 pawn moves', () => {
        const s = buildScenario();
        const moves = getMoves(s,'e3');
        checkMoves(moves, ['e4']);
    });

    it('Should calculate f3 queen moves', () => {
        const s = buildScenario();
        const moves = getMoves(s,'f3');
        checkMoves(moves, ['c6','d5','e4','g4','e2','d1','f4','f5','f6']);
    });

    it('Should calculate g3 pawn moves', () => {
        const s = buildScenario();
        const moves = getMoves(s,'g3');
        checkMoves(moves, ['h4']);
    });

    it('Should calculate h3 knight moves', () => {
        const s = buildScenario();
        const moves = getMoves(s,'h3');
        checkMoves(moves, ['g5','f4','g1']);
    });

    it('Should calculate a2 pawn moves', () => {
        const s = buildScenario();
        const moves = getMoves(s,'a2');
        checkMoves(moves, []);
    });

    it('Should calculate c2 pawn moves', () => {
        const s = buildScenario();
        const moves = getMoves(s,'c2');
        checkMoves(moves, []);
    });

    it('Should calculate d2 pawn moves', () => {
        const s = buildScenario();
        const moves = getMoves(s,'d2');
        checkMoves(moves, ['d3','d4']);
    });

    it('Should calculate f2 pawn moves', () => {
        const s = buildScenario();
        const moves = getMoves(s,'f2');
        checkMoves(moves, []);
    });

    it('Should calculate g2 bishop moves', () => {
        const s = buildScenario();
        const moves = getMoves(s,'g2');
        checkMoves(moves, ['f1']);
    });

    it('Should calculate h2 pawn moves', () => {
        const s = buildScenario();
        const moves = getMoves(s,'h2');
        checkMoves(moves, []);
    });

    it('Should calculate a1 rook moves', () => {
        const s = buildScenario();
        const moves = getMoves(s,'a1');
        checkMoves(moves, ['b1','c1','d1']);
    });

    it('Should calculate e1 king moves', () => {
        const s = buildScenario();
        const moves = getMoves(s,'e1');
        checkMoves(moves, ['d1','e2','f1','a1','h1']);
    });

    it('Should calculate h1 rook moves', () => {
        const s = buildScenario();
        const moves = getMoves(s,'h1');
        checkMoves(moves, ['f1','g1']);
    });

});

// http://www.thechesswebsite.com/bestmove3/
describe('Board as of The Chess Website #3', () => {

    const buildScenario = () => {
        const s = new TestScenario();
        s.__setPiece('a8','rook','black',false);
        s.__setPiece('c8','knight','white',true);
        s.__setPiece('e8','king','black',false);
        s.__setPiece('h8','rook','black',false);
        s.__setPiece('a7','pawn','black',false);
        s.__setPiece('b7','pawn','black',false);
        s.__setPiece('c7','pawn','black',false);
        s.__setPiece('d6','pawn','black',true);
        s.__setPiece('f6','knight','black',true);
        s.__setPiece('c5','bishop','black',true);
        s.__setPiece('e5','pawn','black',true);
        s.__setPiece('c4','bishop','white',true);
        s.__setPiece('e4','pawn','white',true);
        s.__setPiece('g4','bishop','black',true);
        s.__setPiece('d3','pawn','white',true);
        s.__setPiece('g3','pawn','black',true);
        s.__setPiece('h3','pawn','white',true);
        s.__setPiece('a2','pawn','white',false);
        s.__setPiece('b2','pawn','white',false);
        s.__setPiece('c2','pawn','white',false);
        s.__setPiece('d2','queen','white',true);
        s.__setPiece('e2','knight','black',true);
        s.__setPiece('f2','pawn','white',false);
        s.__setPiece('g2','pawn','white',false);
        s.__setPiece('a1','rook','white',false);
        s.__setPiece('b1','knight','white', false);
        s.__setPiece('f1','rook','white',true);
        s.__setPiece('h1','king','white',true);
        return s;
    };

    it('Should calculate a8 rook moves', () => {
        const s = buildScenario();
        const moves = getMoves(s,'a8');
        checkMoves(moves, ['b8','c8']);
    });

    it('Should calculate c8 knight moves', () => {
        const s = buildScenario();
        const moves = getMoves(s,'c8');
        checkMoves(moves, ['a7','b6','d6','e7']);
    });

    it('Should calculate e8 king moves', () => {
        const s = buildScenario();
        const moves = getMoves(s,'e8');
        checkMoves(moves, ['d8','d7','f8']);
        // castling not allowed because it will be in check in transit
        // due to c4 bishop
    });

    it('Should allow e8 king to castle if c4 bishop moves', () => {
        const s = buildScenario();
        const s2 = new MovePieceScenario(s.board, s.enPassantSquareName);
        s2.from(2,3).to(0,5).evaluate(); // c4 to a6
        const moves = getMoves(s2,'e8');
        checkMoves(moves, ['d8','d7','f7','f8','h8']);
    });

    it('Should not allow e8 king to castle if c4 bishop moves and king has moved before', () => {
        const s = buildScenario();
        s.__setPiece('e8','king','black',true);
        const s2 = new MovePieceScenario(s.board, s.enPassantSquareName);
        s2.from(2,3).to(0,5).evaluate(); // c4 to a6
        const moves = getMoves(s2,'e8');
        checkMoves(moves, ['d8','d7','f7','f8']);
    });

    it('Should not allow e8 king to castle if c4 bishop moves and h8 rook has moved before', () => {
        const s = buildScenario();
        s.__setPiece('h8','rook','black',true);
        const s2 = new MovePieceScenario(s.board, s.enPassantSquareName);
        s2.from(2,3).to(0,5).evaluate(); // c4 to a6
        const moves = getMoves(s2,'e8');
        checkMoves(moves, ['d8','d7','f7','f8']);
    });

    it('Should calculate h8 rook moves', () => {
        const s = buildScenario();
        const moves = getMoves(s,'h8');
        checkMoves(moves, ['f8','g8','h7','h6','h5','h4','h3']);
    });

    it('Should not allow h8 rook to castle if c4 bishop moves', () => {
        // castling is only considered a "king" move
        const s = buildScenario();
        const s2 = new MovePieceScenario(s.board, s.enPassantSquareName);
        s2.from(2,3).to(0,5).evaluate(); // c4 to a6
        const moves = getMoves(s2,'h8');
        checkMoves(moves, ['f8','g8','h7','h6','h5','h4','h3']);
    });

    it('Should calculate a7 pawn moves', () => {
        const s = buildScenario();
        const moves = getMoves(s,'a7');
        checkMoves(moves, ['a6','a5']);
    });

    it('Should calculate b7 pawn moves', () => {
        const s = buildScenario();
        const moves = getMoves(s,'b7');
        checkMoves(moves, ['b6','b5']);
    });

    it('Should calculate c7 pawn moves', () => {
        const s = buildScenario();
        const moves = getMoves(s,'c7');
        checkMoves(moves, ['c6']);
    });

    it('Should calculate d6 pawn moves', () => {
        const s = buildScenario();
        const moves = getMoves(s,'d6');
        checkMoves(moves, ['d5']);
    });

    it('Should calculate f6 knight moves', () => {
        const s = buildScenario();
        const moves = getMoves(s,'f6');
        checkMoves(moves, ['d7','g8','h7','h5','e4','d5']);
    });

    it('Should calculate c5 bishop moves', () => {
        const s = buildScenario();
        const moves = getMoves(s,'c5');
        checkMoves(moves, ['b6','a3','b4','d4','e3','f2']);
    });

    it('Should calculate e5 pawn moves', () => {
        const s = buildScenario();
        const moves = getMoves(s,'e5');
        checkMoves(moves, []);
    });

    it('Should calculate c4 bishop moves', () => {
        const s = buildScenario();
        const moves = getMoves(s,'c4');
        checkMoves(moves, ['a6','b5','b3','d5','e6','f7','g8']);
    });

    it('Should calculate e4 pawn moves', () => {
        const s = buildScenario();
        const moves = getMoves(s,'e4');
        checkMoves(moves, []);
    });

    it('Should calculate g4 bishop moves', () => {
        const s = buildScenario();
        const moves = getMoves(s,'g4');
        checkMoves(moves, ['f3','h3','h5','f5','e6','d7','c8']);
    });

    it('Should calculate d3 pawn moves', () => {
        const s = buildScenario();
        const moves = getMoves(s,'d3');
        checkMoves(moves, ['d4']);
    });

    it('Should calculate g3 pawn moves', () => {
        const s = buildScenario();
        const moves = getMoves(s,'g3');
        checkMoves(moves, ['f2']);
    });

    it('Should calculate h3 pawn moves', () => {
        const s = buildScenario();
        const moves = getMoves(s,'h3');
        checkMoves(moves, ['h4']);
    });

    it('Should calculate a2 pawn moves', () => {
        const s = buildScenario();
        const moves = getMoves(s,'a2');
        checkMoves(moves, ['a3','a4']);
    });

    it('Should calculate b2 pawn moves', () => {
        const s = buildScenario();
        const moves = getMoves(s,'b2');
        checkMoves(moves, ['b3','b4']);
    });

    it('Should calculate c2 pawn moves', () => {
        const s = buildScenario();
        const moves = getMoves(s,'c2');
        checkMoves(moves, ['c3']);
    });

    it('Should calculate d2 queen moves', () => {
        const s = buildScenario();
        const moves = getMoves(s,'d2');
        checkMoves(moves, ['a5','b4','c3','c1','d1','e1','e2','e3','f4','g5','h6']);
    });

    it('Should calculate e2 knight moves', () => {
        const s = buildScenario();
        const moves = getMoves(s,'e2');
        checkMoves(moves, ['d4','f4','c3','c1','g1']);
    });

    it('Should calculate f2 pawn moves', () => {
        const s = buildScenario();
        const moves = getMoves(s,'f2');
        checkMoves(moves, ['f3','f4','g3']);
    });

    it('Should calculate g2 pawn moves', () => {
        const s = buildScenario();
        const moves = getMoves(s,'g2');
        checkMoves(moves, []);
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

    it('Should calculate f1 rook moves', () => {
        const s = buildScenario();
        const moves = getMoves(s,'f1');
        checkMoves(moves, ['c1','d1','e1','g1']);
    });

    it('Should calculate h1 king moves', () => {
        const s = buildScenario();
        const moves = getMoves(s,'h1');
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