// Project: codenames
// Created by: kocjod20
// Date: 2024-05-10
// Time: 11:31:43

import React, {useContext, useState} from 'react';
import {Card} from "../common/models";
import PlayerContext from "../context/PlayerContext";
import "./card.css";

interface Props {
  card: Card;
}

const CardComponent = ({card}: Props) => {
  const [player, setPlayer] = useContext(PlayerContext);
  let textColor = 'inherit';
  const [flipped, setFlipped] = useState<boolean>(false);

  return (
    <div className={flipped ? "flipped" : ""} onClick={() => setFlipped(!flipped)}>
      <div className="card">
        <div className="card-front">
          {card.word}{player.role === 'MASTER' ? " - " + card.color : ""}
        </div>
        <div className="card-back">
        </div>
      </div>
    </div>
  );
};

export default CardComponent;