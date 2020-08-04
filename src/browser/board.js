import CONSTANTS from './constants.js';

function createMatrix(size) {
  createMatrixBrowser(size);
  return createMatrixConsole(size);
}

function createMatrixBrowser(size) {
  let body = createBody(size);
  document.getElementsByTagName('body')[0].innerHTML = body;
}

function createBody(size) {
  let body = `<div id='board' class='board'> \n`;
  for (let lineIndex = 0; lineIndex < size; lineIndex += 1) {
    body += `<div id='line ` + lineIndex + `' class='line'>\n`;
    for (let columnIndex = 0; columnIndex < size; columnIndex += 1) {
      body += createCell(lineIndex, columnIndex, size);
    }
    body += `</div>\n`;
  }
  body += `<div id='winningBar'></div>\n</div>\n<div id='play-again-button'></div>\n`;
  return body;
}

function createCell(lineIndex, columnIndex, maxSize) {
  let cell = `<div id='cell ` + lineIndex + `x` + columnIndex + `' class='cell blankSpace`;
  if (lineIndex === 0) {
    cell += ` borderUp`;
  }
  else if (lineIndex === maxSize - 1) {
    cell += ` borderBot`;
  }
  if (columnIndex === 0) {
    cell += ` borderLeft`;
  }
  else if (columnIndex === maxSize - 1) {
    cell += ` borderRight`;
  }
  cell += `'></div>\n`;
  return cell;
}

function createMatrixConsole(size) {
  const matrix = [];
  for (let i = 0; i < size; i += 1) {
    const line = [];
    for (let j = 0; j < size; j += 1) {
      line.push(CONSTANTS.BLANK);
    }
    matrix.push(line);
  }
  return matrix;
}

function printBoard(matrix, playerSymbols) {
  updateBoardOnBrowser(matrix, playerSymbols);
  printBoardOnConsole(matrix, playerSymbols);
}

function updateBoardOnBrowser(matrix, playerSymbols) {
  const matrixSize = matrix.length;
  for (let lineIndex = 0; lineIndex < matrixSize; lineIndex += 1) {
    for (let columnIndex = 0; columnIndex < matrixSize; columnIndex += 1) {
      let cell = document.getElementById('cell' + ' ' + lineIndex + 'x' + columnIndex);
      updateCellDiv(cell, playerSymbols, matrix[lineIndex][columnIndex]);
      updateCellAndLineSizes(matrix.length);
    }
  }
}

function updateCellDiv(cell, playerSymbols, matrixSymbol) {
  if (matrixSymbol == playerSymbols.first) {
    cell.textContent = matrixSymbol;
    cell.classList.add('firstPlayerSymbol');
    cell.classList.remove('blankSpace');
  }
  else if (matrixSymbol === playerSymbols.second) {
    cell.textContent = matrixSymbol;
    cell.classList.add('secondPlayerSymbol');
    cell.classList.remove('blankSpace');
  }
}

function updateCellAndLineSizes(size) {
  let lines = document.getElementsByClassName('line');
  let cells = document.getElementsByClassName('cell');
  let percentage = 100 / size;
  for (let i = 0; i < lines.length; i += 1) {
    lines[i].style.height = percentage + `%`;
  }
  for (let j = 0; j < cells.length; j += 1) {
    cells[j].style.width = percentage + `%`;
  }
}

function printBoardOnConsole(matrix, playerSymbols) {
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
  array.forEach(function (element) {
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
  if (symbol === CONSTANTS.BLANK) {
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

export default {
  createMatrix,
  printBoard,
  transformArrayIntoStringAndPrint,
}