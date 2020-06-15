// depois do code review eu apago os comentarios. é uma "boa pratica"?
module.exports = {
  createMatrix,
  viewBoard,
  // duvida: aqui eu preciso passar as funções "auxiliares" da função principal?
};

function createMatrix(size) {
  const matrix = []; // matrix me parece um nome ruim mas é oq realmente é, a matrix do tabuleiro, nao pensei em nada melhor
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
  // to passando muitos parametros, nao?
  const lastColumn = size - 1;
  // uma função para verificar a ultima coluna seria indicada? pois ai a função faria uma coisa só e muito bem  e podia ser reutilizada
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

function isLastColumn(column, size) {
  return column === size - 1;
  // que nome seria adequado pra eu poder usar tambem com linha? is last parece muito ruim e nao preciso
  // alem disso, como eu to sempre mais interessado quando esse caso ta falso, seria bom chamar a função de isNOTLastColumn e inverter a logica?
}
const matrix = createMatrix(3);
viewBoard(matrix, 3);
