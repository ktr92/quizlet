import { computed } from "vue"
import { useMainStore } from "@/stores/mainstore"

export default () => {
  const mainStore = useMainStore()
  const compLoading = computed(() => mainStore.getLoading)
  const compError = computed(() => mainStore.getError)

  return {
    mainStore,
    compLoading,
    compError,
  }
}
