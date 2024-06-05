// Project: codenames
// Created by: kocjod20
// Date: 2024-06-04
// Time: 13:30:09
import "./WinBanner.css"

import React, {useContext} from 'react';
import GameStateContext from "../context/GameStateContext";

const WinBanner = () => {
  const [gameState, setGameState] = useContext(GameStateContext);
  return !gameState.started && gameState.winner ? (
    <div className="win-banner">
      <div>{gameState.winner.toLocaleLowerCase()} won the last game</div>
    </div>
  ) : <></>;
};

export default WinBanner;