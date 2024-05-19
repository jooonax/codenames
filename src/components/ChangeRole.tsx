// Project: codenames
// Created by: kocjod20
// Date: 2024-05-14
// Time: 14:04:27

import React, {useContext} from 'react';
import WebsocketContext from "../context/WebsocketContext";
import PlayerContext from "../context/PlayerContext";
import "./changeRole.css"
import GameStateContext from "../context/GameStateContext";

const ChangeRole = () => {
  const [websocketFunctions, _2, connected] = useContext(WebsocketContext);
  const [player, setPlayer] = useContext(PlayerContext);
  const [gameState, setGameState] = useContext(GameStateContext);

  const handleTeam = (team: "RED" | "BLUE" | "NONE") => {
    let role = player.role;
    if (player.team === team) {
      team = "NONE";
      role = "NONE";
    }
    websocketFunctions.changeRole({...player, team: team, role: role});
  }
  const handleRole = (role: "OPERATOR" | "MASTER" | "NONE") => {
    if (player.role === role) {
      role = "NONE";
    }
    websocketFunctions.changeRole({...player, role: role});
  }

  return gameState.started && player.role !== "NONE" && player.team !== "NONE" ? <></> : (
    <>
      <div className="role-change" style={gameState.started ? {top: "23vw"} : {}}>

        {gameState.started && player.team !== "NONE" ? <></> : <>
          <div className={"role-change-red" + (player.team === "RED" ? " role-change-selected" : "")}
               onClick={() => handleTeam("RED")}></div>

          <div className={"role-change-blue"  + (player.team === "BLUE" ? " role-change-selected" : "")}
               onClick={() => handleTeam("BLUE")}></div>
        </>}

        {gameState.started && player.role !== "NONE" || player.team === "NONE" ? <></> : <>
          <div className={"role-change-duke" + (player.role === "MASTER" ? " role-change-selected" : "")}
               onClick={() => handleRole("MASTER")}></div>

          <div className={"role-change-rouge" + (player.role === "OPERATOR" ? " role-change-selected" : "")}
          onClick={() => handleRole("OPERATOR")}></div>
        </>}
      </div>
    </>
  );
};

export default ChangeRole;