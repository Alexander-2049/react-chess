export function convertToChessCoordinates(coordinates: [number, number]): string {
  const chessLetters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
  const x = coordinates[0];
  const y = coordinates[1];

  const chessFile = chessLetters[x];
  const chessRank = 8 - y;

  return `${chessFile}${chessRank}`;
}