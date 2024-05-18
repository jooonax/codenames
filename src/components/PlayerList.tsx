import React, {CSSProperties, useContext, useState} from 'react';
import "./playerList.css"
import usePlayers from "../hooks/usePlayers";
import PlayerContext from "../context/PlayerContext";
import {Player} from "../common/models";

// Project: codenames
// Created by: kocjod20
// Date: 2024-05-18
// Time: 21:18:13

const PlayerList = () => {
  const [player, setPlayer] = useContext(PlayerContext);
  const players = usePlayers(player.roomCode);
  const [open, setOpen] = useState<boolean>(false);

  const getStyle = (): CSSProperties => {
    return open ? {
      bottom: Math.min(players.length, 5)*4 + "vw"
    } : {};
  }
  const getListStyle = (): CSSProperties => {
    return {
      height: (open ? Math.min(players.length, 5) : 0) * 4 + "vw",
    }
  }
  const getIconStyle = (player: Player): CSSProperties => {
    return player.role !== "NONE" ? {
      backgroundImage: 'url("/src/assets/' + (player.role === "MASTER" ? 'duke' : 'rouge') + '.png")',
      backgroundSize: "3.3vw 3.3vw"
    } : {};
  }
  const getListItemStyle = (player: Player): CSSProperties => {
    return player.team !== "NONE" ? {
      backgroundImage: 'url("/src/assets/player-row-' + player.team.toLocaleLowerCase() + '.png")',
      backgroundSize: "28vw 4vw"
    } : {};
  }

  return players.length > 0 ? (
    <div onClick={() => setOpen(!open)}>
      <div className="player-list" style={getStyle()}>
        <div className="player-list-title">Players in Room</div>
        <div className="player-list-length" style={players.length >= 10 ?{
          fontSize: "1.5vw"
        }:{}}>{players.length}</div>
      </div>
      <div className="player-list-container" style={getListStyle()}>
        {players.map((p, i) => <div key={i} className="player-list-item" style={getListItemStyle(p)}>
          <div className="player-list-title">{p.username}</div>
          <div className="player-list-item-icon" style={getIconStyle(p)}></div>
        </div>)}
      </div>
    </div>
  ) : <></>;
};

export default PlayerList;