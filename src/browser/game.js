import board from './board.js';
import CONSTANTS from './constants.js';


let isGameFinished;
function runGame(matrixSize, playerSymbols) {
  isGameFinished = false;
  const turns = {
    actual: 0,
    final: matrixSize * matrixSize,
  };

  console.log('oi');

  let matrix = board.createMatrix(matrixSize);
  board.printBoard(matrix, playerSymbols);

  while (!isGameFinished) {
    matrix = runTurn(turns, playerSymbols.first, matrix, playerSymbols);
    if (isGameFinished) {
      return true;
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
  const coordinates = askMovementInConsole(playerSymbol, matrix);

  const updatedMatrix = putPiece(playerSymbol, coordinates, matrix);
  return updatedMatrix;
}

function askMovementInConsole(playerSymbol, matrix) {
  let validMove = false;
  const chosenCoordinates = {
    line: null,
    column: null,
  };
  while (!validMove) {
    console.log(`Vez de ${playerSymbol}. Qual sua jogada?`);
    tellPlayerWhatIsTheWinnerMove(matrix, playerSymbol);
    console.log('Qual a linha?');
    chosenCoordinates.line = prompt('linha?');
    console.log('Qual a coluna?');
    chosenCoordinates.column = prompt('coluna?');
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

function verifyIfGameIsFinished(turns, matrix, symbol) {
  if (itsAVictory(matrix, symbol)) {
    colorWinningBar(turns.actual);
    return true
  }
  else {
    return itsAnAce(turns);
  }
}

function colorWinningBar(turn) {
  let winningBar = document.getElementById('winningBar');
  console.log(winningBar);
  console.log('turn:', turn);
  console.log(turn % 2);
  if (turn % 2 === 0) {
    console.log('é par');
    winningBar.classList.add('secondPlayerWinningBar');
  }
  else {
    console.log('nao é par');
    winningBar.classList.add('firstPlayerWinningBar');
  }
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
    if (verifyIfLineIsFullOfTheSameSymbolAndPrintMessageToTheWinner(
      matrix[i],
      symbol,
    )) {

      if (i === 0) {
        document.getElementById('winningBar').classList.add('firstLine');
      }
      else if (i === 2) {
        document.getElementById('winningBar').classList.add('thirdLine');
      }


      return true;
    }
    else if (verifyIfColumnIsFullOfTheSameSymbolAndPrintMessageToTheWinner(
      matrix,
      i,
      symbol,
    )) {
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
    printWinnerMessageAndCreateTheWinnerBar(symbol);
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
    printWinnerMessageAndCreateTheWinnerBar(symbol);
    document.getElementById('winningBar').classList.add('verticalBar');


    if (column === 0) {
      document.getElementById('winningBar').classList.add('firstColumn');
    }
    else if (column === 2) {
      document.getElementById('winningBar').classList.add('thirdColumn');
    }

    return true;
  }
  return false;
}
function verifyIfAtLeastOneDiagonalIsFullOfTheSameSymbol(matrix, symbol) {
  const diagonalSize = matrix.length;
  if (
    diagonalSize === getNumberofThisSymbolInMainDiagonal(matrix, symbol)
  ) {
    printWinnerMessageAndCreateTheWinnerBar(symbol);
    document.getElementById('winningBar').classList.add('mainDiagonalBar');
    return true;
  }
  else if (diagonalSize === getNumberofThisSymbolInReverseDiagonal(matrix, symbol)) {
    printWinnerMessageAndCreateTheWinnerBar(symbol);
    document.getElementById('winningBar').classList.add('reverseDiagonalBar');
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

function printWinnerMessageAndCreateTheWinnerBar(winnerSymbol) {
  console.log('\nVitória de', winnerSymbol, '! Parabéns!');
  document.getElementById('winningBar').classList.add('winningBar');
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

// testes abaixo pra nao usar o game.js

// console.log('oi');

// const matrix = board.createMatrix(3);
// matrix[0][1] = 'x';
// matrix[0][0] = 'x';
// matrix[1][1] = 'y';
// matrix[2][0] = 'y';
// let playerSymbols = {
//   first: 'x',
//   second: 'y',
// };
// board.printBoard(matrix, playerSymbols);

// const l = prompt();
// const c = prompt();
// matrix[l][c] = 'y';
// board.printBoard(matrix, playerSymbols);

export default {
  runGame,
  putPiece,
}
