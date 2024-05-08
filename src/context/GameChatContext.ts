// Project: codenames
// Created by: kocjod20
// Date: 2024-05-08
// Time: 11:25:12

import {createContext} from "react";
import {ChatMessage} from "../common/models";

const gameChatContext = createContext<[ChatMessage[], (_:ChatMessage) => void]>([[], () => null]);

export default gameChatContext;