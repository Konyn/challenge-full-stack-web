// Utilities
import { defineStore } from "pinia";
import type INotification from "@/interfaces/INotification";

export const useNotificationStore = defineStore("notifications", {
  state: () => ({
    notification: {} as INotification,
  }),
  actions: {
    setNotification(message: string,type:string = 'success') {
      this.notification = {
        show: true,
        type,
        message
      };
      setTimeout(() => {
        this.notification = {} as INotification
      },3000)
    },
  },
  getters: {
    getNotification: (state) => state.notification
  },

});
