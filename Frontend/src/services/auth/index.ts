import apiClient from "@/composables/axios.config";
import type IAuth from "@/interfaces/IAuth";

export default class Auth {
  static async login(payload: IAuth) {
    const response = await apiClient.post("/login", payload);
    return response;
  }
  static async logout() {
    const response = await apiClient.post("/logout");
    return response;
  }
}
