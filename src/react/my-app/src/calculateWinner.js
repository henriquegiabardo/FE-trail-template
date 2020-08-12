function itsAVictory(matrix, symbol) {
  const matrixSize = matrix.length;
  let winningCells = [];
  for (let i = 0; i < matrixSize; i += 1) {
    if (verifyIfLineIsFullOfTheSameSymbolAndPrintMessageToTheWinner(
      matrix[i],
      symbol,
    )) {
      for (let j = 0; j < matrixSize; j += 1) {
        winningCells.push([i, j]);
      }
      return winningCells;
    }
    else if (verifyIfColumnIsFullOfTheSameSymbolAndPrintMessageToTheWinner(
      matrix,
      i,
      symbol,
    )) {
      for (let j = 0; j < matrixSize; j += 1) {
        winningCells.push([j, i]);
      }
      return winningCells;
    }
  }
  winningCells = verifyIfAtLeastOneDiagonalIsFullOfTheSameSymbol(matrix, symbol);
  return winningCells;
}

function verifyIfLineIsFullOfTheSameSymbolAndPrintMessageToTheWinner(
  line,
  symbol,
) {
  const lineSize = line.length;
  if (lineSize === getNumberOfThisSymbolInThisLine(line, symbol)) {
    return true;
  }
  return false;
}
function verifyIfColumnIsFullOfTheSameSymbolAndPrintMessageToTheWinner(
  matrix,
  column,
  symbol,
) {
  const columnSize = matrix.length;
  if (
    columnSize === getNumberOfThisSymbolInThisColumn(matrix, column, symbol)
  ) {
    return true;
  }
  return false;
}

function verifyIfAtLeastOneDiagonalIsFullOfTheSameSymbol(matrix, symbol) {
  let winningCells = [];
  const diagonalSize = matrix.length;
  if (
    diagonalSize === getNumberofThisSymbolInMainDiagonal(matrix, symbol)
  ) {
    for (let i = 0; i < diagonalSize; i += 1) {
      winningCells.push([i, i]);
    }
    return winningCells;
  }
  else if (diagonalSize === getNumberofThisSymbolInReverseDiagonal(matrix, symbol)) {
    for (let i = 0, j = diagonalSize - 1; i < diagonalSize; i += 1, j -= 1) {
      winningCells.push([i, j]);
    }
    return winningCells;
  }
  return false;
}

function getNumberOfThisSymbolInThisLine(line, symbol) {
  let occurrenccesOfThisSymbol = 0;
  const lineSize = line.length;
  for (let i = 0; i < lineSize; i += 1) {
    if (line[i] === symbol) {
      occurrenccesOfThisSymbol += 1;
    }
  }
  return occurrenccesOfThisSymbol;
}
function getNumberOfThisSymbolInThisColumn(matrix, column, symbol) {
  let occurrenccesOfThisSymbol = 0;
  const columnSize = matrix.length;
  for (let i = 0; i < columnSize; i += 1) {
    if (matrix[i][column] === symbol) {
      occurrenccesOfThisSymbol += 1;
    }
  }
  return occurrenccesOfThisSymbol;
}
function getNumberofThisSymbolInMainDiagonal(matrix, symbol) {
  let occurrenccesOfThisSymbol = 0;
  const matrixSize = matrix.length;
  for (let i = 0; i < matrixSize; i += 1) {
    if (matrix[i][i] === symbol) {
      occurrenccesOfThisSymbol += 1;
    }
  }
  return occurrenccesOfThisSymbol;
}
function getNumberofThisSymbolInReverseDiagonal(matrix, symbol) {
  let occurrenccesOfThisSymbol = 0;
  const matrixSize = matrix.length;
  for (
    let line = 0, column = matrixSize - 1;
    line < matrixSize;
    line += 1, column -= 1
  ) {
    if (matrix[line][column] === symbol) {
      occurrenccesOfThisSymbol += 1;
    }
  }
  return occurrenccesOfThisSymbol;
}

export default {
  itsAVictory,
}