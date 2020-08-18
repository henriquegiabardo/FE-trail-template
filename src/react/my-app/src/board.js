import React, { Fragment, useState, useEffect } from 'react';
import calculateWinner from './calculateWinner.js';


function Board(props) {

  const [squares, setSquares] = useState(createMatrix(props.boardSize));
  const [xIsNext, setXIsNext] = useState(true);
  const [winningCells, setWinningCells] = useState([]);


  function createMatrix(size) {
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

  function placeThePieceAndAvanceTurn(i, j, symbol, squares) {
    squares[i][j] = symbol;
    setSquares(squares);
    setXIsNext(!xIsNext);
  }

  function verifyIfPlayerHasWon(symbol, squares) {
    let winningCells = calculateWinner.itsAVictory(squares, symbol);
    if (winningCells) {
      setWinningCells(winningCells);
      return true;
    }
    return false;
  }

  function resetBoard() {
    setSquares(createMatrix(props.boardSize));
    setXIsNext(true);
    setWinningCells([]);

    props.functionUpdateResetGameToFalse();
  }

  function renderSquare(i, j, matrixSize) {
    return (
      <div
        key={`cell ${i} ${j}`}
        className={`cell
      ${i === 0 ? "border-up" : ""}
      ${j === 0 ? "border-left" : ""}
      ${i === matrixSize - 1 ? "border-bot" : ""}
      ${j === matrixSize - 1 ? "border-right" : ""}`}>
        <Square
          isWinningCell={itsAWinningCell(i, j)}
          value={squares[i][j]}
          onClick={() => handleClickOnSquare(i, j)}
        />
      </div>
    );
  }

  function itsAWinningCell(i, j) {
    if (props.gameIsFinished) {
      return winningCells.some(coordinates => coordinates[0] === i && coordinates[1] === j);
    }
  }

  function handleClickOnSquare(i, j) {
    const squaresOnHandleClick = squares.slice();

    let nextSymbol;
    if (xIsNext) {
      nextSymbol = 'X';
    }
    else {
      nextSymbol = 'O';
    }

    if (props.gameIsFinished)
      return;
    if (squareIsAlreadyUsed(i, j, squaresOnHandleClick)) {
      return;
    }
    placeThePieceAndAvanceTurn(i, j, nextSymbol, squaresOnHandleClick);
    if (verifyIfPlayerHasWon(nextSymbol, squaresOnHandleClick))
      props.functionUpdateGameIsFinishedToTrue();
  }

  function squareIsAlreadyUsed(i, j, squares) {
    return (squares[i][j]);
  }

  useEffect(() => {
    if (props.resetBoard) {
      resetBoard();
    }
  });

  let matrixSize = squares.length;
  return (
    <Fragment>
      {
        squares.map(
          (line, indexLine) => (
            <div key={`line ${indexLine}`} className="line">
              {line.map((cell, indexCell) =>
                renderSquare(indexLine, indexCell, matrixSize))}
            </div>)
        )
      }
    </Fragment>
  );
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