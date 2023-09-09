import { defineStore } from "pinia"

export const useMainStore = defineStore("mainstore", {
  state: () => ({
    loading: false,
    iserror: "",
    dark: false,
    user: false,
  }),
  getters: {
    getLoading: (state) => state.loading,
    getMode: (state) => state.dark,
    getError: (state) => state.iserror,
  },
  actions: {
    changeMode() {
      this.dark = !this.dark
    },
    setError(payload: string) {
      this.iserror = payload
    },
    setLoading(payload: boolean) {
      this.loading = payload
    },
  },
})
