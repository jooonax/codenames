import React, {CSSProperties, useContext} from 'react';
import GameStateContext from "../context/GameStateContext";
import "./gameOverview.css"

// Project: codenames
// Created by: kocjod20
// Date: 2024-05-17
// Time: 19:44:28

const GameOverview = () => {
  const [gameState, setGameState] = useContext(GameStateContext);
  const getStyle = ():CSSProperties => {
    return {
      backgroundImage: getTurn() + 'url("/src/assets/overview.png"), url("/src/assets/card.png")',
      backgroundSize: "14vw 8vw",
    }
  }
  const getTurn = () => {
    return 'url("/src/assets/turn-'+ gameState.turn.toLocaleLowerCase() +'.png"), ';
  }
  return gameState.started ?
    <div className="card game-overview" style={getStyle()}>
      <div className="cards-left-blue">{gameState.cards.filter(c => c.color === "BLUE" && !c.flipped).length}</div>
      <div className="cards-left-red">{gameState.cards.filter(c => c.color === "RED" && !c.flipped).length}</div>
    </div> : <></>;
};

export default GameOverview;