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
      console.log(gameState.intercept?.word.toLocaleLowerCase(), clue.toLowerCase())
      if (gameState.intercept?.word.toLocaleLowerCase() === clue.toLowerCase()) {
        if (gameState.intercept?.amount === amount) {
          setGameState({...gameState,
            winner: gameState.turn === "RED" ? "BLUE" : "RED",
            started: false,
            turn: "NONE",
            intercept: undefined,
            clue: undefined,
          });
        } else {
          setGameState({...gameState,
            turn: gameState.turn === "RED" ? "BLUE" : "RED",
            intercept: undefined,
            clue: undefined,
          });
        }
      } else {
        setGameState({...gameState, clue: {word: clue, amount: amount}});
      }
    }
  }
  const changeAmount = (n: number) => {
    if (amount+n >= 0 && amount+n <= 9) {
      setAmount(amount+n);
    }
  }
  const sendIntercept = () => {
    if (clue.length > 0) {
      setGameState({...gameState, intercept: {word: clue, amount: amount}});
    }
  }
  const interceptSet = (): boolean => (gameState.intercept !== null && gameState.intercept !== undefined && gameState.turn !== player.team);

  return gameState.started && gameState.turn !== "NONE" && player.team !== "NONE" && player.role === "MASTER" && !gameState.clue ? (
    <>
      <div className="clue-input">
          <input type="text" className="clue-word" placeholder={gameState.turn === player.team ? "clue" : "intercept"} value={clue}
                 onChange={(e) => setClue(e.target.value)} readOnly={interceptSet()}/>
        <div className="clue-number">{amount}</div>
        {!interceptSet() &&
            <>
              <div className="clue-number-increase" onClick={() => changeAmount(1)}></div>
              <div className="clue-number-decrease" onClick={() => changeAmount(-1)}></div>
              <div className="clue-send" onClick={() => gameState.turn === player.team ? sendClue() : sendIntercept()}></div>
            </>
        }
      </div>
    </>
  ) : <></>;
};

export default ClueInput;