// Project: codenames
// Created by: kocjod20
// Date: 2024-05-08
// Time: 22:50:50

import React, {useContext, useState} from 'react';
import websocketContext from "../context/WebsocketContext";
import PlayerContext from "../context/PlayerContext";
import CardComponent from "../components/CardComponent";

const HomePage = () => {
  const [websocketFunctions, setWebsocketFunctions, connected] = useContext(websocketContext);
  const [username, setUsername] = useState<string>("");
  const [roomCode, setRoomCode] = useState<string>("");

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

      <button type="button" onClick={() => websocketFunctions.connect({
        username: username.length >= 3 ? username : "player_"+Date.now(),
        roomCode: roomCode.length == 0 ? Date.now().toString() : roomCode,
        role: "NONE",
        team: "NONE",
      })} className={"btn btn-lg btn-primary"}>
        connect
      </button>
    </div>
  );
};

export default HomePage;