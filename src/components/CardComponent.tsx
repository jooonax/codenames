// Project: codenames
// Created by: kocjod20
// Date: 2024-05-10
// Time: 11:31:43

import React from 'react';
import {Card, Player} from "../common/models";
import {Simulate} from "react-dom/test-utils";
import play = Simulate.play;

interface Props {
  card: Card;
  player?: Player;
}

const CardComponent = ({card, player}: Props) => {

  let textColor = 'inherit';

  if (player?.role === 'MASTER') {
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