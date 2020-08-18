import React, { Fragment, useState } from 'react';
import Board from './board.js';




function Game() {

  const [gameIsFinished, setGameIsFinished] = useState(false);
  const [resetGame, setResetGame] = useState(false);
  const [boardSize, setBoardSize] = useState(3);

  function updateGameIsFinishedToTrue() {
    setGameIsFinished(true);
  }

  function replayButtonClick() {
    setGameIsFinished(false);
    setResetGame(true);
  }

  function updateResetGameToFalse() {
    setResetGame(false);
  }

  return (
    <Fragment>
      <div className="board">
        <Board
          boardSize={boardSize}
          resetBoard={resetGame}
          gameIsFinished={gameIsFinished}
          functionUpdateResetGameToFalse={() => updateResetGameToFalse()}
          functionUpdateGameIsFinishedToTrue={() => updateGameIsFinishedToTrue()}
        />
      </div>
      <ReplayButton
        gameIsFinished={gameIsFinished}
        onClick={() => replayButtonClick()}
      />
    </Fragment >
  );

}


function ReplayButton(props) {
  return (
    <button
      id="play-again-button"
      className={props.gameIsFinished ? "play-again-button" : "disabled-button"}
      onClick={props.onClick}
    >
      {props.gameIsFinished ? "Jogar Novamente" : ""}
    </button >
  );
}

export default Game;