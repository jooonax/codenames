// Project: codenames
// Created by: kocjod20
// Date: 2024-05-09
// Time: 13:17:48

import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:8080/app"
})

export default apiClient;