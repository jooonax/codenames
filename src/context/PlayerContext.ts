// Project: codenames
// Created by: kocjod20
// Date: 2024-05-08
// Time: 10:36:03

import {createContext} from "react";
import {Player} from "../common/models";

const playerContext = createContext<[Player, (_:Player) => void]>([
  {
    id: -1,
    username: "",
    roomCode: "",
    team: "NONE",
    role: "NONE",
  }, () => null
])

export default playerContext;