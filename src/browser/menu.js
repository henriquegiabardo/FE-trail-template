import game from './game.js';

const matrixSize = 3;
let playerSymbols = {
  first: 'x',
  second: 'y',
};

function runGameOnBrowser() {

  game.runGame(matrixSize, playerSymbols);

  let playAgainButton = document.getElementById('play-again-button');
  playAgainButton.addEventListener('click', () => onClick());

}

function onClick() {
  document.getElementById('play-again-button').style.display = 'none';
  runGameOnBrowser();
}


runGameOnBrowser();

