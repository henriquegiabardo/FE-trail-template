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
  for (let line = 0; line < size; line += 1) {
    printLine(matrix, line, size, 'x', 'y');
    if (line !== lastLine) {
      printIntermediateLine(size);
    }
  }
}

function printHeader(size) {
  // pensei em chamar de printFirstLine antes
  process.stdout.write(`${' '} `);
  for (let i = 0; i < size; i += 1) {
    process.stdout.write(`${i} `);
  }
  console.log('');
}

function printLine(matrix, line, size, firstPlayerSymbol, secondPlayerSymbol) {
  const lastColumn = size - 1;
  process.stdout.write(`${line} `);
  for (let column = 0; column < size; column += 1) {
    if (matrix[line][column] === 'Blank') {
      process.stdout.write(`${''} `);
    } else if (matrix[line][column] === 'First Player') {
      process.stdout.write(`${firstPlayerSymbol} `);
    } else if (matrix[line][column] === 'Second Player') {
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
