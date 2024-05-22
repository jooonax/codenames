// Project: codenames
// Created by: kocjod20
// Date: 2024-05-22
// Time: 09:59:15

import React, {useContext} from 'react';
import WebsocketContext from "../context/WebsocketContext";
import PlayerContext from "../context/PlayerContext";
import "./disconnectButton.css";

const DisconnectButton = () => {
  const [websocketFunctions, _2, _3] = useContext(WebsocketContext);
  const [player, setPlayer] = useContext(PlayerContext);

  const disconnect = () => {
    websocketFunctions.disconnect(player);
  }

  return (
    <div className="disconnect-button" onClick={disconnect}>
      <div>Disconnect</div>
    </div>
  );
};

export default DisconnectButton;