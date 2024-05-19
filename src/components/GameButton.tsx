import React, {useContext} from 'react';
import websocketContext from "../context/WebsocketContext";
import GameStateContext from "../context/GameStateContext";
import "./gameButton.css";

// Project: codenames
// Created by: kocjod20
// Date: 2024-05-19
// Time: 17:31:58

const GameButton = () => {
  const [gameState, setGameState] = useContext(GameStateContext);
  const [websocketFunctions, _2, connected] = useContext(websocketContext);

  const changeGameState = () => {
    if (gameState.started) {
      if (confirm("This will stop reset the game. Are u sure?")) {
        setGameState({...gameState, started: false, cards: [], turn: "NONE", clue: undefined});
      }
    } else {
      websocketFunctions.start()
    }
  }

  return (
    <div className="game-button" onClick={changeGameState}>
      <div>
        {gameState.started ? "End" : "Start"} Game
      </div>
    </div>
  );
};

export default GameButton;