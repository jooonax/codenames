import React, {useContext} from 'react';
import PlayerContext from "../context/PlayerContext";
import "./playerInfo.css";

// Project: codenames
// Created by: kocjod20
// Date: 2024-05-16
// Time: 17:29:30

const PlayerInfo = () => {
  const [player, setPlayer] = useContext(PlayerContext);
  return (
    <div className="player-info">
      <div>ID: {player.id}</div>
      <div>Username: {player.username}</div>
      <div>Code: {player.roomCode}</div>
      <div>Role: {player.role}</div>
      <div>Team: {player.team}</div>
    </div>
  );
};

export default PlayerInfo;