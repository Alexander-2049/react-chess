enum Pieces {
    KING = 'K',
    QUEEN = 'Q',
    ROOK = 'R',
    BISHOP = 'B',
    KNIGHT = 'N',
    PAWN = ''
}

export function generateChessMoveName(from: string, to: string, pieceFrom: Pieces, pieceTo: Pieces): string {
    // Validate the input
    const validPieces = ['K', 'Q', 'R', 'B', 'N', ''];
    const validDestinations = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
    const validRanks = ['1', '2', '3', '4', '5', '6', '7', '8'];
  
    if (!validPieces.includes(pieceFrom)) {
      throw new Error(`Invalid piece on 'from' cell: ${pieceFrom}`);
    }
  
    if (!validPieces.includes(pieceTo)) {
      throw new Error(`Invalid piece on 'to' cell: ${pieceTo}`);
    }
  
    if (!validDestinations.includes(from[0])) {
      throw new Error(`Invalid 'from' file: ${from[0]}`);
    }
  
    if (!validRanks.includes(from[1])) {
      throw new Error(`Invalid 'from' rank: ${from[1]}`);
    }
  
    if (!validDestinations.includes(to[0])) {
      throw new Error(`Invalid 'to' file: ${to[0]}`);
    }
  
    if (!validRanks.includes(to[1])) {
      throw new Error(`Invalid 'to' rank: ${to[1]}`);
    }
  
    // Generate the move name
    let moveName = '';
  
    if (pieceFrom === '' && pieceTo === '') {
      // Handle pawn moves and captures
      moveName = from[0];
      if (to === 'en') {
        moveName += 'x';
      } else {
        moveName += '-';
      }
      moveName += to;
    } else if (pieceFrom === 'K' && (from === 'e1' || from === 'e8') && (to === 'g1' || to === 'g8')) {
      // Handle kingside castle
      moveName = 'O-O';
    } else if (pieceFrom === 'K' && (from === 'e1' || from === 'e8') && (to === 'c1' || to === 'c8')) {
      // Handle queenside castle
      moveName = 'O-O-O';
    } else {
      // Handle regular moves and captures
      moveName = pieceFrom + (pieceTo !== '' ? 'x' : '') + to;
    }
  
    return moveName;
  }
  