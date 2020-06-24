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

function viewBoard(matrix, matrixSize) {
  const lastLine = matrixSize - 1;
  printHeader(matrixSize);
  for (let lineIndex = 0; lineIndex < matrixSize; lineIndex += 1) {
    printLine(matrix[lineIndex], lineIndex, matrixSize, 'x', 'y');
    if (lineIndex !== lastLine) {
      printIntermediateLine(matrixSize);
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

function printLine(
  line,
  lineIndex,
  matrixSize,
  firstPlayerSymbol,
  secondPlayerSymbol,
) {
  const lastColumn = matrixSize - 1;
  process.stdout.write(`${lineIndex} `);
  for (let column = 0; column < matrixSize; column += 1) {
    const symbol = line[column];
    printSymbol(symbol, firstPlayerSymbol, secondPlayerSymbol);
    if (column !== lastColumn) {
      process.stdout.write(`${'|'}`);
    }
  }
  console.log('');
}

function printSymbol(symbol, firstPlayerSymbol, secondPlayerSymbol) {
  if (symbol === 'Blank') {
    process.stdout.write(`${''} `);
  } else if (symbol === 'First Player') {
    process.stdout.write(`${firstPlayerSymbol} `);
  } else if (symbol === 'Second Player') {
    process.stdout.write(`${secondPlayerSymbol} `);
  }
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

const matrix = createMatrix(3);
viewBoard(matrix, 3);

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
