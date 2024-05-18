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
    if (confirm("Send Clue")) {
      setGameState({...gameState, clue: {word: clue, amount: amount}});
    }
  }

  return gameState.turn !== "NONE" && player.team === gameState.turn && player.role === "MASTER" && !gameState.clue ? (
    <>
      <div className="clue-input">
          <input type="text" className="clue-word" placeholder={"clue"}
                 onChange={(e) => setClue(e.target.value)}
                 onKeyPress={(event) => event.key === "Enter" ? sendClue() : null}/>
        <input type="number"  className="clue-number" max={9} min={0} placeholder={"0"}
               onChange={(e) => setAmount(+e.target.value)}/>
      </div>
    </>
  ) : <></>;
};

export default ClueInput;