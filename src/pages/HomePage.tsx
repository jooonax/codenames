// Project: codenames
// Created by: kocjod20
// Date: 2024-05-08
// Time: 22:50:50

import React, {useContext, useState} from 'react';
import websocketContext from "../context/WebsocketContext";
import PlayerContext from "../context/PlayerContext";
import CardComponent from "../components/CardComponent";
import apiClient from "../service/apiClient";

const HomePage = () => {
  const [websocketFunctions, setWebsocketFunctions, connected] = useContext(websocketContext);
  const [username, setUsername] = useState<string>("");
  const [roomCode, setRoomCode] = useState<string>("");

  const connect = () => {
    apiClient.get<number>("/id")
      .then(res => res.data)
      .then(id => {
        websocketFunctions.connect({
          id: id,
          username: username.length >= 3 ? username : "player_"+Date.now(),
          roomCode: roomCode.length == 0 ? Date.now().toString() : roomCode,
          role: "NONE",
          team: "NONE",
        })
      });
  }

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

  return connected ? <></> : (
    <div className={"container mt-2"}>
      <div className={"mb-2"}>
        <input type="text" onChange={(e) => setUsername(e.target.value)} id={"tfUsername"} className={"form-control form-control-lg"} placeholder={"username"}/>
        <div id="passwordHelpBlock" className="form-text">
          Your Username must be  3 characters long or a random one will be generated
        </div>
      </div>
      <div className={"mb-2"}>
        <input type="text" onChange={(e) => setRoomCode(e.target.value)} id={"tfRoomCode"} className={'form-control form-control-lg'} placeholder={"code"}/>
      </div>

      <button type="button" onClick={connect} className={"btn btn-lg btn-primary"}>
        connect
      </button>
      {sessionStorage.getItem("roomCode") && sessionStorage.getItem("id") ? <button type="button" onClick={connectToLast}>
        connect to saved Room
      </button> : <></>}
    </div>
  );
};

export default HomePage;