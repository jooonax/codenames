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
import ClueOutput from "../components/ClueOutput";
import PlayerList from "../components/PlayerList";
import GameButton from "../components/GameButton";

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
      <ClueOutput/>
      <PlayerList/>
      <GameButton/>

      {/*Under Construction*/}
      {/*<GameChat/>*/}
      {!gameState.started && <ChangeRole/>}
      <ClueInput/>
      {!gameState.started && <>

          <strong>{gameState.winner} won the last game</strong>
      </>}
    </div>
  );
};

export default GamePage;