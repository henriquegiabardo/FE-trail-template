const game = require('./game');
const prompt = require('prompt-sync')();
const CONSTANTS = require('./constants.js');

function showInitialOptions() {
  console.log('1) Iniciar o jogo');
  console.log('2) Customizar peças');
  const answer = prompt();
  if (answer === '1') {
    return CONSTANTS.START_GAME; // 'startGame'
  }
  if (answer === '2') {
    return CONSTANTS.CUSTOM_PIECES; // 'customPieces'
  }
}

function customPieces(playerSymbols) {
  const updatedPieces = playerSymbols;
  console.log('Quem começa jogando?');
  updatedPieces.first = prompt();
  console.log('e seu adversario?');
  updatedPieces.second = prompt();
  return updatedPieces;
}

function runMenu() {
  let wantsToPlay = true;
  const matrixSize = 3;
  let playerSymbols = {
    first: 'x',
    second: 'y',
  };

  console.log('Bem vindo ao jogo da velha!\n');
  while (wantsToPlay) {
    console.log('Escolha uma opção:');
    const choice = showInitialOptions();
    if (choice === CONSTANTS.CUSTOM_PIECES) {
      playerSymbols = customPieces(playerSymbols);
    }
    if (choice === CONSTANTS.START_GAME) {
      game.runGame(matrixSize, playerSymbols);
      console.log('Deseja jogar novamente? (Sim/Nao)');
      const answer = prompt();
      if (answer === 'Nao') {
        wantsToPlay = false;
      }
    }
    console.log('\n');
  }
}

runMenu();
