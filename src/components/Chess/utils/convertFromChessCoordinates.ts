export function convertFromChessCoordinates(chessCoordinate: string): [number, number] {
  const chessLetters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
  const chessFile = chessCoordinate.charAt(0);
  const chessRank = Number(chessCoordinate.charAt(1)) - 1;

  const x = chessLetters.indexOf(chessFile);
  const y = 7 - chessRank;

  return [x, y];
}
