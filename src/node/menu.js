const game = require('./game');
const prompt = require('prompt-sync')();

function showInitialOptions() {
  console.log('1) Iniciar o jogo');
  console.log('2) Customizar peças');
  const answer = prompt();
  if (answer === '1') {
    return 1; // 'startGame'
  }
  if (answer === '2') {
    return 2; // 'customPieces'
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
  const matrixSize = 2;
  let playerSymbols = {
    first: 'x',
    second: 'y',
  };
  const startGame = 1;
  const customizePieces = 2;

  console.log('Bem vindo ao jogo da velha!\n');
  while (wantsToPlay) {
    console.log('Escolha uma opção:');
    const choice = showInitialOptions();
    if (choice === customizePieces) {
      playerSymbols = customPieces(playerSymbols);
    }
    if (choice === startGame) {
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
