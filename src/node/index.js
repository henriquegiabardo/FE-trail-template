const board = require('./board');
const { default: prin } = require('./board');

const hello = () => {
  console.log('Helloooo world!');
};

class Board {
  constructor(size) {
    this.size = size;
    this.sizeWithEdges = size + 1;
    this.matrix = createBoardMatrix(size);
  }

  view() {
    console.log('this.matrix');
  }
}

function createBoardMatrix(size) {
  const boardMatrix = [];
  const boardLine = [];
  for (let i = 0; i < size; i += 1) {
    for (let j = 0; j < size; j += 1) {
      boardLine.push('Blank');
    }
    boardMatrix.push(boardLine);
  }
}

hello();
const boarde = new Board(3);
// board.view();
console.log(board);
board.legal();
