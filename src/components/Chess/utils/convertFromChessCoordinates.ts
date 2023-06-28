export function convertFromChessCoordinates(chessCoordinate: string): [number, number] | null {
    const chessFile = chessCoordinate[0].toLowerCase();
    const chessRank = chessCoordinate[1];
  
    const chessLetters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
    const x = chessLetters.indexOf(chessFile);
    const y = 8 - parseInt(chessRank);
  
    if (x >= 0 && y >= 0 && x < 8 && y < 8) {
      return [x, y];
    } else {
      return null;
    }
  }
  