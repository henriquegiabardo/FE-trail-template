const prompt = require('prompt-sync')();
const board = require('./board');
const CONSTANTS = require('./constants.js');

let isGameFinished;
function runGame(matrixSize, playerSymbols) {
  isGameFinished = false;
  const turns = {
    actual: 0,
    final: matrixSize * matrixSize,
  };

  let matrix = board.createMatrix(matrixSize);
  board.printBoard(matrix, playerSymbols);

  while (!isGameFinished) {
    matrix = runTurn(turns, playerSymbols.first, matrix, playerSymbols);
    if (isGameFinished) {
      return true; // usei só pra sair
    }
    matrix = runTurn(turns, playerSymbols.second, matrix, playerSymbols);
  }
}

function runTurn(turns, player, matrix, playerSymbols) {
  const updatedMatrix = playerMove(player, matrix);
  turns.actual += 1;
  board.printBoard(matrix, playerSymbols);
  isGameFinished = verifyIfGameIsFinished(turns, matrix, player);
  return updatedMatrix;
}

function playerMove(playerSymbol, matrix) {
  const coordinates = askMovement(playerSymbol, matrix);
  const updatedMatrix = putPiece(playerSymbol, coordinates, matrix);
  return updatedMatrix;
}

function askMovement(playerSymbol, matrix) {
  let validMove = false;
  const chosenCoordinates = {
    line: null,
    column: null,
  };
  while (!validMove) {
    console.log(`Vez de ${playerSymbol}. Qual sua jogada?`);
    tellPlayerWhatIsTheWinnerMove(matrix, playerSymbol);
    console.log('Qual a linha?');
    chosenCoordinates.line = prompt();
    console.log('Qual a coluna?');
    chosenCoordinates.column = prompt();
    console.log(
      `Linha: ${chosenCoordinates.line}, Coluna: ${chosenCoordinates.column}`,
    );
    if (itsValidSpace(chosenCoordinates, matrix)) {
      validMove = true;
      return chosenCoordinates;
    }
  }
}

function itsValidSpace(chosenCoordinates, matrix) {
  const matrixSize = matrix.length;
  if (
    itsInsideTheBoard(chosenCoordinates, matrixSize) &&
    itsBlankSpace(chosenCoordinates, matrix)
  ) {
    return true;
  }
  console.log('Espaço invalido, escolha novamente');
  return false;
}

function itsInsideTheBoard(chosenCoordinates, matrixSize) {
  if (
    itsValueIsBetweenZeroAndBoardSize(chosenCoordinates.line, matrixSize) &&
    itsValueIsBetweenZeroAndBoardSize(chosenCoordinates.column, matrixSize)
  ) {
    return true;
  }
  console.log('Espaço não está dentro do tabuleiro');
  return false;
}

function itsValueIsBetweenZeroAndBoardSize(value, boardSize) {
  return value > -1 && value < boardSize;
}

function itsBlankSpace(chosenCoordinates, matrix) {
  if (
    matrix[chosenCoordinates.line][chosenCoordinates.column] === CONSTANTS.BLANK
  ) {
    // bug se eu coloco 00 ou 01 por exemplo
    return true;
  }
  console.log('Espaço não está vazio');
  return false;
}

function putPiece(playerSymbol, coordinates, matrix) {
  const updatedMatrix = matrix;
  updatedMatrix[coordinates.line][coordinates.column] = playerSymbol;
  return updatedMatrix;
}

function verifyIfGameIsFinished(turn, matrix, symbol) {
  return itsAnAce(turn) || itsAVictory(matrix, symbol);
}

function itsAnAce(turn) {
  if (turn.actual === turn.final) {
    console.log('É um empate, não existem mais casas disponiveis. Deu velha!');
    return true;
  }
  return false;
}

function itsAVictory(matrix, symbol) {
  const matrixSize = matrix.length;
  for (let i = 0; i < matrixSize; i += 1) {
    if (
      verifyIfLineIsFullOfTheSameSymbolAndPrintMessageToTheWinner(
        matrix[i],
        symbol,
      ) ||
      verifyIfColumnIsFullOfTheSameSymbolAndPrintMessageToTheWinner(
        matrix,
        i,
        symbol,
      )
    ) {
      return true;
    }
  }
  return verifyIfAtLeastOneDiagonalIsFullOfTheSameSymbol(matrix, symbol);
}

function verifyIfLineIsFullOfTheSameSymbolAndPrintMessageToTheWinner(
  line,
  symbol,
) {
  const lineSize = line.length;
  if (lineSize === getNumberOfThisSymbolInThisLine(line, symbol)) {
    printWinnerMessage(symbol);
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
    printWinnerMessage(symbol);
    return true;
  }
  return false;
}
function verifyIfAtLeastOneDiagonalIsFullOfTheSameSymbol(matrix, symbol) {
  const diagonalSize = matrix.length;
  if (
    diagonalSize === getNumberofThisSymbolInMainDiagonal(matrix, symbol) ||
    diagonalSize === getNumberofThisSymbolInReverseDiagonal(matrix, symbol)
  ) {
    printWinnerMessage(symbol);
    return true;
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

function printWinnerMessage(winnerSymbol) {
  console.log('\nVitória de', winnerSymbol, '! Parabéns!');
}

function tellPlayerWhatIsTheWinnerMove(matrix, symbol) {
  const arrayOfStrings = ['Movimentos'];
  let thereIsAWinnableMove = false;
  const matrixSize = matrix.length;
  for (let i = 0; i < matrixSize; i += 1) {
    if (theLineIsWinnable(matrix[i], symbol)) {
      thereIsAWinnableMove = true;
      arrayOfStrings.push(
        getBlankSpaceCoordinatesInTheLineAsString(matrix, i),
        ' ',
      );
    }
    if (theColumnIsWinnable(matrix, i, symbol)) {
      thereIsAWinnableMove = true;
      arrayOfStrings.push(
        getBlankSpaceCoordinatesInTheColumnAsString(matrix, i),
        ' ',
      );
    }
  }
  if (theMainDiagonalIsWinnable(matrix, symbol)) {
    thereIsAWinnableMove = true;
    arrayOfStrings.push(
      getBlankSpaceCoordinatesInTheMainDiagonalAsString(matrix),
    );
  }
  if (theReverseDiagonalIsWinnable(matrix, symbol)) {
    thereIsAWinnableMove = true;
    arrayOfStrings.push(
      getBlankSpaceCoordinatesInTheReverseDiagonalAsString(matrix),
    );
  }
  if (thereIsAWinnableMove) {
    arrayOfStrings.push('ganham o jogo!');
    board.transformArrayIntoStringAndPrint(arrayOfStrings);
  }
}

function theLineIsWinnable(line, symbol) {
  const lineSize = line.length;
  return (
    getNumberOfThisSymbolInThisLine(line, symbol) === lineSize - 1 &&
    getNumberOfThisSymbolInThisLine(line, CONSTANTS.BLANK) === 1
  );
}
function theColumnIsWinnable(matrix, column, symbol) {
  const columnSize = matrix.length;
  return (
    getNumberOfThisSymbolInThisColumn(matrix, column, symbol) ===
      columnSize - 1 &&
    getNumberOfThisSymbolInThisColumn(matrix, column, CONSTANTS.BLANK) === 1
  );
}
function theMainDiagonalIsWinnable(matrix, symbol) {
  const diagonalSize = matrix.length;
  return (
    getNumberofThisSymbolInMainDiagonal(matrix, symbol) === diagonalSize - 1 &&
    getNumberofThisSymbolInMainDiagonal(matrix, CONSTANTS.BLANK) === 1
  );
}
function theReverseDiagonalIsWinnable(matrix, symbol) {
  const diagonalSize = matrix.length;
  return (
    getNumberofThisSymbolInReverseDiagonal(matrix, symbol) ===
      diagonalSize - 1 &&
    getNumberofThisSymbolInReverseDiagonal(matrix, CONSTANTS.BLANK) === 1
  );
}

function getBlankSpaceCoordinatesInTheLineAsString(matrix, line) {
  const lineSize = matrix.length;
  for (let column = 0; column < lineSize; column += 1) {
    if (matrix[line][column] === CONSTANTS.BLANK) {
      return String(`(${line},${column})`);
    }
  }
}
function getBlankSpaceCoordinatesInTheColumnAsString(matrix, column) {
  const columnSize = matrix.length;
  for (let line = 0; line < columnSize; line += 1) {
    if (matrix[line][column] === CONSTANTS.BLANK) {
      return String(`(${line},${column})`);
    }
  }
}
function getBlankSpaceCoordinatesInTheMainDiagonalAsString(matrix) {
  const diagonalSize = matrix.length;
  for (let i = 0; i < diagonalSize; i += 1) {
    if (matrix[i][i] === CONSTANTS.BLANK) {
      return String(`(${i},${i})`);
    }
  }
}
function getBlankSpaceCoordinatesInTheReverseDiagonalAsString(matrix) {
  const diagonalSize = matrix.length;
  for (
    let line = 0, column = diagonalSize - 1;
    line < diagonalSize;
    line += 1, column -= 1
  ) {
    if (matrix[line][column] === CONSTANTS.BLANK) {
      return String(`(${line},${column})`);
    }
  }
}

module.exports = {
  runGame,
};
