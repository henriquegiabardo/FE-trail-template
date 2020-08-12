import React, { Fragment } from 'react';
import Board from './board.js';


class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gameIsFinished: false,
      resetGame: false,
      boardSize: 3,
    };
  }

  updateGameIsFinishedToTrue() {
    this.setState({
      gameIsFinished: true,
    });
  }

  replayButtonClick() {
    this.setState({
      gameIsFinished: false,
      resetGame: true,
    });
  }

  updateResetGameToFalse() {
    this.setState({
      resetGame: false,
    });
  }

  render() {
    return (
      <Fragment>
        <div className="board">
          <Board
            boardSize={this.state.boardSize}
            resetBoard={this.state.resetGame}
            gameIsFinished={this.state.gameIsFinished}
            functionUpdateResetGameToFalse={() => this.updateResetGameToFalse()}
            functionUpdateGameIsFinishedToTrue={() => this.updateGameIsFinishedToTrue()}
          />
        </div>
        <ReplayButton
          gameIsFinished={this.state.gameIsFinished}
          onClick={() => this.replayButtonClick()}
        />
      </Fragment >
    );
  }
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