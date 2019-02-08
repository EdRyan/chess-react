const LOWERCASE_A_ASCII = 97;

export const squareNameToArrayIndices = squareName => {
    const file = squareName.charCodeAt(0) - LOWERCASE_A_ASCII;
    const rank = squareName[1] - 1;

    return [file, rank];
};

export const arrayIndicesToSquareName = ([x,y]) => {
    const file = String.fromCharCode(x + LOWERCASE_A_ASCII);
    const rank = y+1;

    return file.concat(rank);
};