// Project: codenames
// Created by: kocjod20
// Date: 2024-05-14
// Time: 22:24:01
import React, {useContext, useState} from 'react';
import PlayerContext from "../context/PlayerContext";
import GameStateContext from "../context/GameStateContext";
import "./clueInput.css"

const ClueInput = () => {
  const [player, setPlayer] = useContext(PlayerContext);
  const [gameState, setGameState] = useContext(GameStateContext);
  const [clue, setClue] = useState<string>("");
  const [amount, setAmount] = useState<number>(0);

  const sendClue = () => {
    if (clue.length > 0) {
      setGameState({...gameState, clue: {word: clue, amount: amount}});
    }
  }
  const changeAmount = (n: number) => {
    if (amount+n >= 0 && amount+n <= 9) {
      setAmount(amount+n);
    }
  }

  return gameState.turn !== "NONE" && player.team === gameState.turn && player.role === "MASTER" && !gameState.clue ? (
    <>
      <div className="clue-input">
          <input type="text" className="clue-word" placeholder={"clue"} value={clue}
                 onChange={(e) => setClue(e.target.value)}/>
        <div className="clue-number">{amount}</div>
        <div className="clue-number-increase" onClick={() => changeAmount(1)}></div>
        <div className="clue-number-decrease" onClick={() => changeAmount(-1)}></div>
        <div className="clue-send" onClick={sendClue}></div>
      </div>
    </>
  ) : <></>;
};

export default ClueInput;