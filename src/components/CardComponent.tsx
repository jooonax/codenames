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
  const c = {...card};
  const [player, setPlayer] = useContext(PlayerContext);
  let textColor = 'inherit';

  if (player.role === 'MASTER') {
    if (c.color.toLowerCase() === 'white') c.color = 'darkgray';
    textColor = c.color;
  }

  return (
    <div style={{ color: textColor }}>
      {c.word}
    </div>
  );
};

export default CardComponent;