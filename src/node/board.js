module.exports = {
  createMatrix,
  viewBoard,
};

// agora que eu descobri a maravilha que é colocar tudo em objetos pra organizar, to pensando em por exemplo, criar o objeto playerSymbols.first e second
// é uma boa? pro matrix tbm

function createMatrix(size) {
  const matrix = [];
  for (let i = 0; i < size; i += 1) {
    const line = [];
    for (let j = 0; j < size; j += 1) {
      line.push('Blank');
    }
    matrix.push(line);
  }
  return matrix;
}

function viewBoard(matrix, matrixSize, firstPlayerSymbol, secondPlayerSymbol) {
  const lastLine = matrixSize - 1;
  printHeader(matrixSize);
  for (let lineIndex = 0; lineIndex < matrixSize; lineIndex += 1) {
    printLine(
      matrix[lineIndex],
      lineIndex,
      matrixSize,
      firstPlayerSymbol,
      secondPlayerSymbol,
    );
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
  } else if (symbol === firstPlayerSymbol) {
    process.stdout.write(`${firstPlayerSymbol}`);
  } else if (symbol === secondPlayerSymbol) {
    process.stdout.write(`${secondPlayerSymbol}`);
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
