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

const GamePage = () => {
  const [gameState, setGameState] = useContext(GameStateContext);
  const [player, setPlayer] = useContext(PlayerContext);
  const [_1, _2, connected] = useContext(websocketContext);
  const players = usePlayers(player.roomCode);


  return !connected ? <></> : (
    <div>
      <div>Username: {player.username}</div>
      <div>Code: {player.roomCode}</div>
      <GameChat/>
      <h3>Players in Room:</h3>
      <ul>
        {players.map((p,i) => <li key={i}>{p.username}</li>)}
      </ul>
    </div>
  );
};

export default GamePage;