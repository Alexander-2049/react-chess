export function collectBoardErrors(board: any) {
  const errorStack: string[] = [];

  if (!Array.isArray(board)) errorStack.push('Invalid board structure: board is not an array');
  else if (board.length !== 8) errorStack.push('Invalid board height: board must have exactly 8 rows');

  for (let rowIndex = 0; rowIndex < board.length; rowIndex++) {
    const row = board[rowIndex];
    if (!Array.isArray(row)) errorStack.push(`Invalid row structure at index ${rowIndex}: row is not an array`);
    else if (row.length !== 8) errorStack.push(`Invalid row width at index ${rowIndex}: row must have exactly 8 cells`);

    for (let cellIndex = 0; cellIndex < row.length; cellIndex++) {
      const cell = row[cellIndex];
      if (cell !== null && Array.isArray(cell)) {
        if (cell.length < 2) errorStack.push(`Invalid cell structure at row ${rowIndex}, cell ${cellIndex}: cell is an array but its length is less than 2`);
        else if (!Number.isInteger(cell[0]) || !Number.isInteger(cell[1])) errorStack.push(`Invalid cell values at row ${rowIndex}, cell ${cellIndex}: cell values must be integers`);
        if (cell.length > 2) {
          for (let i = 2; i < cell.length; i++) {
            const position = cell[i];
            if (typeof position !== 'string') errorStack.push(`Invalid position at row ${rowIndex}, cell ${cellIndex}, position index ${i}: position is not a string`);
          }
        }
      } else if (cell !== null) {
        errorStack.push(`Invalid cell at row ${rowIndex}, cell ${cellIndex}: cell is neither null nor an array`);
      }
    }
  }

  return errorStack.length > 0 ? errorStack : false;
}
