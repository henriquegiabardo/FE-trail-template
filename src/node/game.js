const board = require('./board');
const prompt = require('prompt-sync')();

// ideia: matrix vira um objeto com a matrix e com o size
// limpar o codigo agra, deixar as coisas mais concisas, pensando nos proximos 3 passos:
// vitoria, prever o movimento pra vitoria
// qm sabe dividir em mais .js

function runGame(matrixSize, firstPlayerSymbol, secondPlayerSymbol) {
  const turn = {
    actual: 0,
    final: matrixSize * matrixSize,
  };
  let matrix = board.createMatrix(matrixSize);
  board.viewBoard(matrix, matrixSize), firstPlayerSymbol, secondPlayerSymbol;
  let gameIsFinished = false;
  while (!gameIsFinished) {
    matrix = playerMove(firstPlayerSymbol, matrix, matrixSize);
    board.viewBoard(matrix, matrixSize, firstPlayerSymbol, secondPlayerSymbol);
    turn.actual += 1;
    if (verifyIfGameIsFinished(turn, matrix)) {
      return true;
    }
    matrix = playerMove(secondPlayerSymbol, matrix, matrixSize);
    board.viewBoard(matrix, matrixSize, firstPlayerSymbol, secondPlayerSymbol);
    turn.actual += 1;
    gameIsFinished = verifyIfGameIsFinished(turn, matrix);
  }
}

function playerMove(playerSymbol, matrix, matrixSize) {
  const coordinates = askMovement(playerSymbol, matrix, matrixSize);
  const updatedMatrix = putPiece(playerSymbol, coordinates, matrix, matrixSize);

  return updatedMatrix;
}

function askMovement(playerSymbol, matrix, matrixSize) {
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

    if (itsValidSpace(chosenCoordinates, matrixSize, matrix)) {
      validMove = true;
      return chosenCoordinates;
    }
  }
}

function itsValidSpace(chosenCoordinates, matrixSize, matrix) {
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
    return true;
  }
  console.log('Espaço não está vazio');
  return false;
}
function putPiece(playerSymbol, coordinates, matrix, matrixSize) {
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

function showInitialOptions() {
  console.log('1) Iniciar o jogo');
  console.log('2) Customizar peças');
  const answer = prompt();
  if (answer === '1') {
    return 'startGame';
  }
  if (answer === '2') {
    return 'customPieces';
  }
}

function customPieces(pieces) {
  const updatedPieces = pieces;
  console.log('Quem começa jogando?');
  updatedPieces.firstPlayerSymbol = prompt();
  console.log('e seu adversario?');
  updatedPieces.secondPlayerSymbol = prompt();
  return updatedPieces;
}
let wantsToPlay = true;
let pieces = {
  firstPlayerSymbol: 'x',
  secondPlayerSymbol: 'y',
};
// talvez jogar esse fluxo para um menu.js
while (wantsToPlay) {
  const matrixSize = 2;

  console.log('Bem vindo ao jogo da velha!\nEscolha uma opção:');
  const choice = showInitialOptions();
  if (choice === 'customPieces') {
    pieces = customPieces(pieces);
  }
  runGame(matrixSize, pieces.firstPlayerSymbol, pieces.secondPlayerSymbol);
  console.log('Desje jogar novamente? (Sim/Nao)');
  const answer = prompt();
  if (answer === 'Sim') {
    console.log('\n');
  } else if (answer === 'Nao') {
    wantsToPlay = false;
    console.log('\n');
  }
}
