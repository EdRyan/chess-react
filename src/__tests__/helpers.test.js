import { squareNameToArrayIndices, arrayIndicesToSquareName } from "../helpers";

describe('squareNameToArrayIndices', () => {

    it('should convert a1 to (0,0)', () => {
        expect(squareNameToArrayIndices('a1')).toEqual([0, 0]);
    });

    it('should convert h8 to (7,7)', () => {
        expect(squareNameToArrayIndices('h8')).toEqual([7, 7]);
    });

    it('should convert g5 to (6,4)', () => {
        expect(squareNameToArrayIndices('g5')).toEqual([6, 4]);
    });

});

describe('arrayIndicesToSquareName', () => {

    it('should convert (0,0) to a1', () => {
        expect(arrayIndicesToSquareName([0, 0])).toEqual('a1');
    });

    it('should convert (7,7) to h8', () => {
        expect(arrayIndicesToSquareName([7, 7])).toEqual('h8');
    });

    it('should convert (6,4) to g5', () => {
        expect(arrayIndicesToSquareName([6, 4])).toEqual('g5');
    });

});