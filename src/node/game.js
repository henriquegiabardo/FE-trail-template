const prompt = require('prompt-sync')();
const board = require('./board');

module.exports = {
  runGame,
};

function runGame(matrixSize, playerSymbols) {
  const turns = {
    actual: 0,
    final: matrixSize * matrixSize,
  };
  const gameIs = {
    finished: false,
  };
  let matrix = board.createMatrix(matrixSize);
  board.printBoard(matrix, playerSymbols);

  while (!gameIs.finished) {
    matrix = runTurn(turns, playerSymbols.first, matrix, gameIs);
    board.printBoard(matrix, playerSymbols);
    matrix = runTurn(turns, playerSymbols.second, matrix, gameIs);
    board.printBoard(matrix, playerSymbols);
  }
}

function runTurn(turns, player, matrix, gameIs) {
  const updatedMatrix = playerMove(player, matrix);
  turns.actual += 1;
  gameIs.finished = verifyIfGameIsFinished(turns, matrix);
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
  if (matrix[chosenCoordinates.line][chosenCoordinates.column] === 'Blank') {
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

function verifyIfGameIsFinished(turn, matrix) {
  return itsAnAce(turn) || itsAVictory(matrix);
}

function itsAnAce(turn) {
  if (turn.actual === turn.final) {
    console.log('É um empate, não existem mais casas disponiveis. Deu velha!');
    return true;
  }
  return false;
}

function itsAVictory(matrix) {
  return false;
}
