import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import './index.css';




function Square(props) {
  return (
    <button className={`button-cell ${props.value === 'X' ? "firstPlayerSymbol" : "secondPlayerSymbol"}`}
      onClick={props.onClick}>
      {props.value}
    </button>
  );
}

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      // matrix: createMatrix(3).fill(null),
      xIsNext: true,
    };
  }

  createMatrix(size) {
    const matrix = [];
    for (let i = 0; i < size; i += 1) {
      const line = [];
      for (let j = 0; j < size; j += 1) {
        // line.push(CONSTANTS.BLANK); // trocar isso por null talvez
      }
      matrix.push(line);
    }
    return matrix;
  }

  handleClick(i) {
    const squares = this.state.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      squares: squares,
      xIsNext: !this.state.xIsNext,
    });
  }

  renderSquare(i) {
    return (
      <div className={`cell`}>
        <Square
          value={this.state.squares[i]}
          onClick={() => this.handleClick(i)}
        />
      </div>
    );
  }

  renderWinningBar() {
    return (
      <div >
        <winningBar
          isGameOver={calculateWinner(this.state.squares)}
        />
      </div>
    );
  }

  render() {
    const winner = calculateWinner(this.state.squares); // trocar por isGameFinished
    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }


    return ( // isso é basicamente o createBody
      <Fragment>
        <div className="line">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="line">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="line" >
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </Fragment>
    );
  }
}

class Game extends React.Component {
  render() {
    return (
      <div className="board">
        <Board />
        <winningBar />
      </div>
    );
  }
}

function calculateWinner(squares) { // trocar tudo isso por verifyIfGameIsFinished 
  // como fazer isso de um jeito arrumado?
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}


function winningBar(props) {
  if (props.isGameOver) {
    return (
      <div id="winning-bar" className="winning-bar">
      </div>
    );
  }
  return;
}

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);


