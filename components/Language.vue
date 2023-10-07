<template>
  <div class="mx-4">
    <!--  <form>
      <select
        v-model="locale"
        id="countries"
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-16 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      >
        <option value="ru">RU</option>
        <option value="en">EN</option>
      </select>
    </form> -->

    <select
      :value="locale"
      @change="onLocaleChanged"
      class="cursor-pointer bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-1 px-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-primary-500 outline-none"
    >
      <option
        v-for="loc in supportedLocales"
        :key="loc.code"
        :value="loc.code"
        class="cursor-pointer"
      >
        {{ loc.name }}
      </option>
    </select>

    <!--  <NuxtLink
      v-for="locale in availableLocales"
      :key="locale.code"
      :to="switchLocalePath(locale.code)"
      >{{ locale.name + " " }}</NuxtLink
    > -->
  </div>
</template>

<script setup lang="ts">
import { LocaleObject } from "@nuxtjs/i18n/dist/runtime/composables"

const { locale, locales } = useI18n()
const switchLocalePath = useSwitchLocalePath()
const router = useRouter()
const supportedLocales = locales.value as Array<LocaleObject>

/* const availableLocales = computed(() => {
  return locales.value
}) */

const onLocaleChanged = (event: Event) => {
  const target = event.target as HTMLInputElement
  router.push({ path: switchLocalePath(target.value) })
}
</script>

<style scoped>
.router-link-active {
  @apply text-primary-500;
}
</style>
