import { defineStore } from "pinia"

export const useMainStore = defineStore("mainstore", {
  state: () => ({
    loading: false,
    iserror: false,
    dark: false,
    user: false,
  }),
  getters: {
    getLoading: (state) => state.loading,
    getMode: (state) => state.dark,
  },
  actions: {
    changeMode() {
      this.dark = !this.dark
    },
  },
})
