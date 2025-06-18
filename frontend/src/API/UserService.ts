import axios from "axios";

import type { ILogin, ICreateNewUser } from "../types/auth.ts";

export default class UserService {
  static async login(data: ILogin) {
    const response = await axios.post("/api/v1/login", data);

    return response;
  }

  static async createNewUser(data: ICreateNewUser) {
    const response = await axios.post("/api/v1/signup", data);

    return response;
  }
}
