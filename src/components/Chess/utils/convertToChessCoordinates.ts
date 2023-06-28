export function convertToCoordinates(coordinates: [number, number]): string {
    const x = coordinates[0];
    const y = coordinates[1];
  
    const chessLetters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
    const chessRank = 8 - y;
  
    const chessFile = chessLetters[x];
    const chessRankString = chessRank.toString();
  
    return chessFile + chessRankString;
  }
  