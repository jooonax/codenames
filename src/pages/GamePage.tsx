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
import Table from "../components/Table";
import PlayerInfo from "../components/PlayerInfo";
import GameOverview from "../components/GameOverview";

const GamePage = () => {
  const [gameState, setGameState] = useContext(GameStateContext);
  const [player, setPlayer] = useContext(PlayerContext);
  const [websocketFunctions, _2, connected] = useContext(websocketContext);
  const players = usePlayers(player.roomCode);
  return !connected ? <></> : (
    <div>
      <PlayerInfo/>
      <GameOverview/>
      <Table/>

      {/*Under Construction*/}
      <div style={{height: "60vh"}}></div>
      <GameChat/>
      {!gameState.started && <ChangeRole/>}
      <h3>Players in Room:</h3>
      <ul>
        {players && players.map((p,i) => <li key={i}>{p.id} {p.username} - {p.team} - {p.role}</li>)}
      </ul>
      <ClueInput/>
      {!gameState.started && <>
          <button type="button" onClick={() => websocketFunctions.start()} className={"btn btn-lg btn-primary"}>
            Start Game
          </button><br/>
          <strong>{gameState.winner} won the last game</strong>
      </>}
      {gameState.started && <>
          <button type="button" onClick={() => {setGameState({...gameState, started: false, cards: [], turn: "NONE", clue: undefined})}}>
              End Game
          </button><br/>
      </>}
    </div>
  );
};

export default GamePage;