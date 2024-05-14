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

const GamePage = () => {
  const [gameState, setGameState] = useContext(GameStateContext);
  const [player, setPlayer] = useContext(PlayerContext);
  const [websocketFunctions, _2, connected] = useContext(websocketContext);
  const players = usePlayers(player.roomCode);
  return !connected ? <></> : (
    <div>
      <div>Username: {player.username}</div>
      <div>Code: {player.roomCode}</div>
      <GameChat/>
      <h3>Players in Room:</h3>
      <ul>
        {players && players.map((p,i) => <li key={i}>{p.username}</li>)}
      </ul>
      <h3>Cards in Room:</h3>
      {gameState.cards && gameState.cards.map((c,i) => <CardComponent key={i} card={c}/>)}
      <button type="button" onClick={() => websocketFunctions.start()} className={"btn btn-lg btn-primary"}>
        Start Game
      </button>
    </div>
  );
};

export default GamePage;