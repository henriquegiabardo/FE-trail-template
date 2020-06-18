module.exports = {
  createMatrix,
  viewBoard,
};

function createMatrix(size) {
  const matrix = [];
  const line = [];
  for (let i = 0; i < size; i += 1) {
    for (let j = 0; j < size; j += 1) {
      line.push('Blank');
    }
    matrix.push(line);
  }
  return matrix;
}

function viewBoard(matrix, size) {
  const lastLine = size - 1;
  // devo passar o size pra garantir ou eu pego o size da matrix?
  printHeader(size);
  for (let lineIndex = 0; lineIndex < size; lineIndex += 1) {
    printLine(matrix, lineIndex, size, 'x', 'y');
    if (lineIndex !== lastLine) {
      printIntermediateLine(size);
    }
  }
}

function printHeader(size) {
  process.stdout.write(`${' '} `);
  for (let i = 0; i < size; i += 1) {
    process.stdout.write(`${i} `);
  }
  console.log('');
}

// trocar os if else if por um função print symbol
// trocar size por matrixSize
// trocar line por lineIndex
// trocar o matrix[line]

function printLine(
  matrix,
  lineIndex,
  size,
  firstPlayerSymbol,
  secondPlayerSymbol,
) {
  const lastColumn = size - 1;
  process.stdout.write(`${lineIndex} `);
  for (let column = 0; column < size; column += 1) {
    if (matrix[lineIndex][column] === 'Blank') {
      process.stdout.write(`${''} `);
    } else if (matrix[lineIndex][column] === 'First Player') {
      process.stdout.write(`${firstPlayerSymbol} `);
    } else if (matrix[lineIndex][column] === 'Second Player') {
      process.stdout.write(`${secondPlayerSymbol} `);
    }
    if (column !== lastColumn) {
      process.stdout.write(`${'|'}`);
    }
  }
  console.log('');
}

function printIntermediateLine(size) {
  const lastColumn = size - 1;
  process.stdout.write(`${' '} `);
  for (let column = 0; column < size; column += 1) {
    process.stdout.write(`${'-'}`);
    if (column !== lastColumn) {
      process.stdout.write(`${'|'}`);
    }
  }
  console.log('');
}
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question('What is your name ? ', function(name) {
  rl.question('Where do you live ? ', function(country) {
    console.log(`${name}, is a citizen of ${country}`);
    rl.close();
  });
});

rl.on('close', function() {
  console.log('\nBYE BYE !!!');
  process.exit(0);
});

const matrix = createMatrix(3);
viewBoard(matrix, 3);
