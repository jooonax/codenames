// Project: codenames
// Created by: kocjod20
// Date: 2024-05-07
// Time: 13:56:57

import React, {useContext} from 'react';
import GameStateContext from "../context/GameStateContext";
import GameChat from "../components/GameChat";
import websocketContext from "../context/WebsocketContext";
import PlayerContext from "../context/PlayerContext";
import usePlayers from "../hooks/usePlayers";
import CardComponent from "../components/CardComponent";
import ChangeRole from "../components/ChangeRole";
import ClueInput from "../components/ClueInput";

const GamePage = () => {
  const [gameState, setGameState] = useContext(GameStateContext);
  const [player, setPlayer] = useContext(PlayerContext);
  const [websocketFunctions, _2, connected] = useContext(websocketContext);
  const players = usePlayers(player.roomCode);
  return !connected ? <></> : (
    <div>
      <div>Username: {player.username}</div>
      <div>Code: {player.roomCode}</div>
      <div>Role: {player.role}</div>
      <div>Team: {player.team}</div>
      <GameChat/>
      <ChangeRole/>
      <h3>Players in Room:</h3>
      <ul>
        {players && players.map((p,i) => <li key={i}>{p.username} - {p.team} - {p.role}</li>)}
      </ul>
      <ClueInput/>
      <h3>Cards in Room:</h3>
      {gameState.started && (<>
        <strong>{gameState.turn} teams turn</strong><br/>
        <strong>Current clue: {gameState.clue?.word} - {gameState.clue?.amount}</strong><br/>
        <strong>Red cards left: {gameState.cards.filter(c => c.color === "RED" && !c.flipped).length}</strong><br/>
        <strong>Blue cards left: {gameState.cards.filter(c => c.color === "BLUE" && !c.flipped).length}</strong>
      </>)}

      {gameState.cards &&
            <div className="cards">
              {gameState.cards.map((c, i) => <CardComponent key={i} card={c}/>)}
            </div>
      }

      {!gameState.started && <>
          <button type="button" onClick={() => websocketFunctions.start()} className={"btn btn-lg btn-primary"}>
            Start Game
          </button><br/>
          <strong>{gameState.winner} won the last game</strong>
      </>}
    </div>
  );
};

export default GamePage;