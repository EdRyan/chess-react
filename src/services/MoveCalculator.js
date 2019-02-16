export default class MoveCalculator {

    constructor(scenario) {
        if (this.getMoves === undefined) {
            throw new TypeError("Must override getMoves");
        }

        this.scenario = scenario;
    }

    _convertOffsetToIndices(piece, x, y, [deltaX, deltaY]) {
        const factor = piece.color === 'black' ? -1 : 1;  // flip 180 degrees for black

        return [x + deltaX * factor, y + deltaY * factor];
    }

    _isInBounds([x,y]) {
        return x >= 0 && x <= 7 && y >= 0 && y <= 7;
    }

}
