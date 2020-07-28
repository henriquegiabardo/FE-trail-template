import game from './game.js';
import CONSTANTS from './constants.js';

function showInitialOptions() {
  console.log('1) Iniciar o jogo');
  console.log('2) Customizar peças');
  const answer = prompt('1 ou 2');
  if (answer === '1') {
    return CONSTANTS.START_GAME;
  }
  if (answer === '2') {
    return CONSTANTS.CUSTOM_PIECES;
  }
}

function customPieces(playerSymbols) {
  const updatedPieces = playerSymbols;
  console.log('Quem começa jogando?');
  updatedPieces.first = prompt('Quem começa jogando?');
  console.log('e seu adversario?');
  updatedPieces.second = prompt('e seu adversario?');
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

      document.getElementById('play-again-button').textContent = 'Jogar Novamente';
      document.getElementById('play-again-button').classList.add('play-again');

      console.log('Deseja jogar novamente? (Sim/Nao)');
      const answer = prompt('Deseja jogar novamente? (Sim/Nao)');
      if (answer === 'Nao') {
        wantsToPlay = false;
      }
    }
    console.log('\n');

  }
}

runMenu();