import React, { Fragment } from 'react';
import calculateWinner from './calculateWinner.js';


class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: this.createMatrix(this.props.boardSize),
      xIsNext: true,
      winningCells: [],
    };
  }

  createMatrix(size) {
    const matrix = [];
    for (let i = 0; i < size; i += 1) {
      const line = [];
      for (let j = 0; j < size; j += 1) {
        line.push(null);
      }
      matrix.push(line);
    }
    return matrix;
  }

  render() {
    if (this.props.resetBoard) {
      this.resetBoard();
    }
    let matrixSize = this.state.squares.length;
    return (
      <Fragment>
        {
          this.state.squares.map(
            (line, indexLine) => (
              <div key={`line ${indexLine}`} className="line">
                {line.map((cell, indexCell) =>
                  this.renderSquare(indexLine, indexCell, matrixSize))}
              </div>)
          )
        }
      </Fragment>
    );
  }

  resetBoard() {
    this.setState({
      squares: this.createMatrix(this.props.boardSize),
      xIsNext: true,
      winningCells: [],
    });
    this.props.functionUpdateResetGameToFalse();
  }

  renderSquare(i, j, matrixSize) {
    return (
      <div
        key={`cell ${i} ${j}`}
        className={`cell
      ${i === 0 ? "border-up" : ""}
      ${j === 0 ? "border-left" : ""}
      ${i === matrixSize - 1 ? "border-bot" : ""}
      ${j === matrixSize - 1 ? "border-right" : ""}`}>
        <Square
          isWinningCell={this.itsAWinningCell(i, j)}
          value={this.state.squares[i][j]}
          onClick={() => this.handleClickOnSquare(i, j)}
        />
      </div>
    );
  }

  itsAWinningCell(i, j) {
    if (this.props.gameIsFinished) {
      return this.state.winningCells.some(coordinates => coordinates[0] === i && coordinates[1] === j);
    }
  }

  handleClickOnSquare(i, j) {
    const squares = this.state.squares.slice();

    let nextSymbol;
    if (this.state.xIsNext) {
      nextSymbol = 'X';
    }
    else {
      nextSymbol = 'O';
    }

    if (this.props.gameIsFinished)
      return;
    if (this.squareIsAlreadyUsed(i, j, squares)) {
      return;
    }
    this.placeThePieceAndAvanceTurn(i, j, nextSymbol, squares);
    if (this.verifyIfPlayerHasWon(nextSymbol, squares))
      this.props.functionUpdateGameIsFinishedToTrue();
  }

  squareIsAlreadyUsed(i, j, squares) {
    return (squares[i][j]);
  }

  placeThePieceAndAvanceTurn(i, j, symbol, squares) {
    squares[i][j] = symbol;
    this.setState({
      squares: squares,
      xIsNext: !this.state.xIsNext,
    });
  }

  verifyIfPlayerHasWon(symbol, squares) {
    let winningCells = calculateWinner.itsAVictory(squares, symbol);
    if (winningCells) {
      this.setState({
        winningCells: winningCells,
      });
      return true;
    }
    return false;
  }
}

function Square(props) {
  return (
    <button className={
      `button-cell 
      ${props.value === 'X' ? "first-player-symbol" : "second-player-symbol"}
      ${props.isWinningCell ? "winningCell" : ""}`
    }
      onClick={props.onClick}>
      {props.value}
    </button>
  );
}

export default Board;