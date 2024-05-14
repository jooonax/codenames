// Project: codenames
// Created by: kocjod20
// Date: 2024-05-14
// Time: 22:24:01
import React, {useContext, useState} from 'react';
import PlayerContext from "../context/PlayerContext";
import GameStateContext from "../context/GameStateContext";

const ClueInput = () => {
  const [player, setPlayer] = useContext(PlayerContext);
  const [gameState, setGameState] = useContext(GameStateContext);
  const [clue, setClue] = useState<string>("");
  const [amount, setAmount] = useState<number>(0);

  return player.team === gameState.turn && player.role === "MASTER" && !gameState.clue ? (
    <>
      <div className={"mb-2"}>
        <input type="text" className={'form-control form-control-lg'} placeholder={"clue"}
               onChange={(e) => setClue(e.target.value)}/>
        <input type="number" className={'form-control form-control-lg'} placeholder={"0"}
               onChange={(e) => setAmount(+e.target.value)}/>
      </div>
      <button type="button" onClick={() => setGameState({...gameState, clue: {word: clue, amount: amount}})} className={"btn btn-lg btn-primary"}>
        Send Clue
      </button>
    </>
  ) : <></>;
};

export default ClueInput;