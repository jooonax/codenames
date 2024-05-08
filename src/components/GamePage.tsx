// Project: codenames
// Created by: kocjod20
// Date: 2024-05-07
// Time: 13:56:57

import React, {useContext} from 'react';
import GameStateContext from "../context/GameStateContext";

const GamePage = () => {
  const [gameState, setGameState] = useContext(GameStateContext);

  return (
    <div>
      <button type="button" onClick={() => setGameState(gameState)}>
        send
      </button>
    </div>
  );
};

export default GamePage;