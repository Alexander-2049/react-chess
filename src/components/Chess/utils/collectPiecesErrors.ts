export function collectPiecesErrors(pieces: unknown) {
    const errorStack: string[] = [];

    if(!Array.isArray(pieces)) {
        errorStack.push('Invalid pieces structure: pieces is not an array');
        return errorStack;
    }
    for(let i = 0; i < pieces.length; i++) {
        const piece = pieces[i];
        const keys = Object.keys(piece);
        const requiredKeys = ['id', 'pieceId', 'color', 'possibleMoves'];

        for(const key of requiredKeys) {
            if(!keys.includes(key)) errorStack.push(`Invalid piece structure: piece does not have ${key} key`);
        }

        if(errorStack.length > 0) return errorStack;

        if(!Number.isInteger(piece.id)) errorStack.push(`Invalid piece structure: id is not a number`);
        if(!Number.isInteger(piece.pieceId)) errorStack.push(`Invalid piece structure: pieceId is not a number`);
        if(!Number.isInteger(piece.color)) errorStack.push(`Invalid piece structure: color is not a number`);
        if(!Array.isArray(piece.possibleMoves)) errorStack.push(`Invalid piece structure: possibleMoves is not an array`);

        if(errorStack.length > 0) return errorStack;
        
        for(let j = 0; j < piece.possibleMoves.length; j++) {
            if(typeof piece.possibleMoves[j] !== 'string') errorStack.push(`Invalid possibleMoves structure: is not a string`);
        }

        if(errorStack.length > 0) return errorStack;
    }

    return false;
}