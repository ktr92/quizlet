import { defineStore } from "pinia"

export const useMainStore = defineStore("mainstore", {
  state: () => ({
    loading: false,
    dark: false,
    user: false,
  }),
  getters: {
    getLoading: (state) => state.loading,
  },
  actions: {},
})