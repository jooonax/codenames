// Project: codenames
// Created by: kocjod20
// Date: 2024-05-08
// Time: 22:50:50

import React, {useContext, useState} from 'react';
import websocketContext from "../context/WebsocketContext";
import PlayerContext from "../context/PlayerContext";
import CardComponent from "../components/CardComponent";
import apiClient from "../service/apiClient";
import {useNavigate} from "react-router-dom";

const HomePage = () => {
  const [websocketFunctions, setWebsocketFunctions, connected] = useContext(websocketContext);
    const [username, setUsername] = useState<string>("");
    const [roomCode, setRoomCode] = useState<string>("");
    const navigate = useNavigate();

  const connect = () => {
    apiClient.get<number>("/id")
      .then(res => res.data)
      .then(id => {
        websocketFunctions.connect({
          id: id,
          username: username.length >= 3 && username.length <= 13 ? username : "player_"+id,
          roomCode: roomCode.length == 0 ? "ROOM_"+id : roomCode,
          role: "NONE",
          team: "NONE",
        })
        navigate("/game");
      });


  }

  const connectToLast = () => {
      navigate("/game");
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