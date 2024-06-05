// Project: codenames
// Created by: kocjod20
// Date: 2024-05-07
// Time: 13:56:57

import React, {useContext, useEffect} from 'react';
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
import {useNavigate} from "react-router-dom";
import {Simulate} from "react-dom/test-utils";
import play = Simulate.play;
import DisconnectButton from "../components/DisconnectButton";
import WinBanner from "../components/WinBanner";

const GamePage = () => {
  const [player, setPlayer] = useContext(PlayerContext);
  const [websocketFunctions, _2, connected] = useContext(websocketContext);

    useEffect(() => {
        if (player.id === -1) {
          connectToLast();
        }

    }, []);

    const connectToLast = () => {
        let roomCode = sessionStorage.getItem("roomCode")
        let idString = sessionStorage.getItem("id");
        if (!roomCode || !idString) return;
        let id = +idString;
        websocketFunctions.connect({
            id: id,
            roomCode: roomCode,
            username: "rejoin",
            role: "NONE",
            team: "NONE",
        })
    }

  return !connected ? <></> : (
    <div>
      <PlayerInfo/>
      <GameOverview/>
      <Table/>
      <ClueOutput/>
      <PlayerList/>
      <GameButton/>
      <ChangeRole/>
      <DisconnectButton/>
      <GameChat/>
      <ClueInput/>
      <WinBanner/>
    </div>
  );
};

export default GamePage;