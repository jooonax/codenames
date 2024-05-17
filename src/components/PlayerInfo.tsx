import React, {CSSProperties, useContext} from 'react';
import PlayerContext from "../context/PlayerContext";
import "./playerInfo.css";
import {Simulate} from "react-dom/test-utils";
import play = Simulate.play;
import WebsocketContext from "../context/WebsocketContext";

// Project: codenames
// Created by: kocjod20
// Date: 2024-05-16
// Time: 17:29:30

const PlayerInfo = () => {
  const [player, setPlayer] = useContext(PlayerContext);
  const [websocketFunctions, _1, _2] = useContext(WebsocketContext);

  const getStyle = ():CSSProperties => {
    return {
      backgroundImage: getTeamImage() + getRoleImage() + 'url("/src/assets/lines.png"), url("/src/assets/card.png")',
      backgroundSize: "14vw 8vw",
    }
  }
  const changeUsername = () => {
    const name = prompt("Enter a new username (3-13 characters)");
    if (name && name.length >= 3 && name.length <= 13) {
      websocketFunctions.changeRole({...player, username: name});
    }
  }

  const getRoleImage = () => {
    return (player.role !== "NONE" ?
      'url("/src/assets/'+ (player.role === "MASTER" ?
        "duke" : "rouge") +
      '.png"), ': "")
  }
  const getTeamImage = () => {
    return (player.team !== "NONE" ?
      'url("/src/assets/top-left-'+ player.team.toLocaleLowerCase() +
      '.png"), ': "")
  }

  return (
    <div className="card player-info" style={getStyle()}>
      <div className="card-front player-info-front" onClick={changeUsername}>{player.username}</div>
      <div className="card-marked">{player.roomCode}</div>
    </div>
  );
};

export default PlayerInfo;