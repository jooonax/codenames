// Project: codenames
// Created by: kocjod20
// Date: 2024-05-10
// Time: 11:31:43

import React from 'react';
import {Card} from "../common/models";

interface Props {
  card: Card;
}

const CardComponent = ({card}: Props) => {
  return (
    <div>
      {card.word} - {card.color}
    </div>
  );
};

export default CardComponent;