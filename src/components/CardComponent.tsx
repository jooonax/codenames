// Project: codenames
// Created by: kocjod20
// Date: 2024-05-10
// Time: 11:31:43

import React, {useContext} from 'react';
import {Card} from "../common/models";
import PlayerContext from "../context/PlayerContext";

interface Props {
  card: Card;
}

const CardComponent = ({card}: Props) => {
  const [player, setPlayer] = useContext(PlayerContext);
  let textColor = 'inherit';

  if (player.role === 'MASTER') {
    textColor = card.color;
    if (card.color.toLowerCase() === 'white') card.color = 'darkgray';
  }

  return (
    <div style={{ color: textColor }}>
      {card.word}
    </div>
  );
};

export default CardComponent;