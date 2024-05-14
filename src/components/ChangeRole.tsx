// Project: codenames
// Created by: kocjod20
// Date: 2024-05-14
// Time: 14:04:27

import React, {ChangeEvent, useContext} from 'react';
import WebsocketContext from "../context/WebsocketContext";
import PlayerContext from "../context/PlayerContext";

const ChangeRole = () => {
  const [websocketFunctions, _2, connected] = useContext(WebsocketContext);
  const [player, setPlayer] = useContext(PlayerContext);

  const handleTeam = (e:ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value == "NONE" || e.target.value == "RED" || e.target.value == "BLUE") {
      websocketFunctions.changeRole({...player, team: e.target.value});
    }
  }

  const handleRole = (e:ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value == "NONE" || e.target.value == "MASTER" || e.target.value == "OPERATOR") {
      websocketFunctions.changeRole({...player, role: e.target.value});
    }
  }

  return (
    <>
      <div className="mb-3">
        <label htmlFor="sRole" className="form-label">ROLE</label>
        <select className="form-select" aria-label="Default select example" id={"sRole"} value={player.role}
                onChange={handleRole}>
          <option value="NONE">NONE</option>
          <option value="MASTER">MASTER</option>
          <option value="OPERATOR">OPERATOR</option>
        </select>
      </div>
      <div className="mb-3">
        <label htmlFor="sTeam" className="form-label">TEAM</label>
        <select className="form-select" aria-label="Default select example" id={"sTeam"} value={player.team}
                onChange={handleTeam}>
          <option value="NONE">NONE</option>
          <option value="RED">RED</option>
          <option value="BLUE">BLUE</option>
        </select>
      </div>
    </>
  );
};

export default ChangeRole;