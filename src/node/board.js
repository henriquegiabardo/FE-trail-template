module.exports = {
  createMatrix,
  printBoard,
};

function createMatrix(size) {
  const matrix = [];
  for (let i = 0; i < size; i += 1) {
    const line = [];
    for (let j = 0; j < size; j += 1) {
      line.push('Blank');
    }
    matrix.push(line);
  }
  return matrix;
}

function printBoard(matrix, playerSymbols) {
  const matrixSize = matrix.length;
  const lastLine = matrixSize - 1;
  printHeader(matrixSize);
  for (let lineIndex = 0; lineIndex < matrixSize; lineIndex += 1) {
    printLine(matrix[lineIndex], lineIndex, playerSymbols);
    if (lineIndex !== lastLine) {
      printIntermediateLine(matrixSize);
    }
  }
}

function printHeader(size) {
  const headerLine = ['  '];
  for (let i = 0; i < size; i += 1) {
    headerLine.push(i, ' ');
  }
  headerLine.push(' ');
  transformArrayIntoStringAndPrint(headerLine);
}

function transformArrayIntoStringAndPrint(array) {
  let string = '';
  array.forEach(function(element) {
    string += element;
  });
  console.log(string);
}

function printLine(line, lineIndex, playerSymbols) {
  const lastColumn = line.length - 1;
  const lineWithSymbols = [lineIndex, ' '];

  for (let column = 0; column < line.length; column += 1) {
    // aprender a usar for each depois
    const symbol = line[column];
    lineWithSymbols.push(getSymbol(symbol, playerSymbols), '');
    if (column !== lastColumn) {
      lineWithSymbols.push('|');
    }
  }
  transformArrayIntoStringAndPrint(lineWithSymbols);
}

function getSymbol(symbol, playerSymbols) {
  if (symbol === 'Blank') {
    return ' ';
  }
  if (symbol === playerSymbols.first) {
    return playerSymbols.first;
  }
  if (symbol === playerSymbols.second) {
    return playerSymbols.second;
  }
}

function printIntermediateLine(size) {
  const lastColumn = size - 1;
  const intermediatedLine = ['  '];

  for (let column = 0; column < size; column += 1) {
    intermediatedLine.push('-');
    if (column !== lastColumn) {
      intermediatedLine.push('|');
    }
  }
  transformArrayIntoStringAndPrint(intermediatedLine);
}
