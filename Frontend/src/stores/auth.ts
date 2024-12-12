// Utilities
import type IAuth from "@/interfaces/IAuth";
import type IUser from "@/interfaces/IUser";
import AdminServices from "@/services/admin/intex";
import Auth from "@/services/auth";
import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: {} as IUser,
    errors: null,
  }),
  actions: {
    async setUser(payload: IAuth) {
      await Auth.login(payload)
        .then((response) => {
          this.user = response.data.data as IUser;
        })
        .catch((error) => {
          this.errors = error.response.data;
        });
    },
    async logout() {
      await Auth.logout()
        .then(() => {
          this.user = {} as IUser;
        })
        .catch((error) => {
          this.errors = error.response.data;
        });
    },
  },
  getters: {
    getUser: (state) => state.user,
    getErrors: (state) => state.errors,
  },
  persist: {
    key: "token",
    pick: ["user.token"],
  },
});
