import React, {useContext} from 'react';
import "./clueOutput.css";
import GameStateContext from "../context/GameStateContext";

// Project: codenames
// Created by: kocjod20
// Date: 2024-05-18
// Time: 20:58:45

const ClueOutput = () => {
  const [gameState, setGameState] = useContext(GameStateContext);
  return gameState.clue ?(
    <div className="clue-output">
      <div className="clue-word">{gameState.clue.word}</div>
      <div className="clue-number">{gameState.clue.amount}</div>
    </div>
  ) : <></>;
};

export default ClueOutput;