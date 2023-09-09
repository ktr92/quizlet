<template>
  <div
    class="bg-white border-gray-200 px-4 lg:px-6 py-2 dark:bg-gray-800 relative"
  >
    <div class="max-w-[1200px] mx-auto py-2">
      <nav class="">
        <div
          class="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl"
        >
          <div class="hidden md:block">
            <div v-if="user">
              <ul class="-mx-4 flex items-center">
                <li class="px-4">
                  <NuxtLink
                    to="/user/add/"
                    class="text-white focus:ring-4 !outline-none focus:!outline-none font-medium px-[15px] py-1 md:py-[10px] text-md text-center cursor-pointer whitespace-nowrap bg-primary-600 text-white dark:bg-primary-500 hover:bg-primary-300 rounded"
                  >
                    Create course
                  </NuxtLink>
                </li>
                <li class="px-4">
                  <NuxtLink
                    class="text-primary-900 dark:text-white"
                    to="/user/courses/"
                    >Courses</NuxtLink
                  >
                </li>
                <li class="px-4">
                  <NuxtLink
                    class="text-primary-900 dark:text-white"
                    to="/user/tags/"
                    >Tags</NuxtLink
                  >
                </li>
              </ul>
              <!-- /.flex -->
            </div>
          </div>
          <button
            data-collapse-toggle="mobile-menu-2"
            type="button"
            class="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="mobile-menu-2"
            aria-expanded="false"
            @click="toggleMenu"
            ref="dropdown"
          >
            <span class="sr-only">Open main menu</span>
            <svg
              class="w-6 h-6"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clip-rule="evenodd"
              ></path>
            </svg>
            <svg
              class="hidden w-6 h-6"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </button>
          <!--  <NuxtLink to="/" class="flex items-center">
            <img
              src="https://flowbite.com/docs/images/logo.svg"
              class="mr-3 h-6 sm:h-9"
              alt="Flowbite Logo"
            />
            <span
              class="self-center text-xl font-semibold whitespace-nowrap dark:text-white"
              >Flowbite</span
            >
          </NuxtLink> -->
          <div class="flex items-center lg:order-2">
            <UIIconbutton
              class="mr-4 coursor-pointer"
              @some-event="changeMode"
              classes="w-9 h-9 bg-slate-100 hover:bg-primary-500 text-white dark:bg-gray-800 coloredsvg"
              type="round"
            >
              <Icon
                v-if="darkMode"
                name="ic:outline-light-mode"
                size="22"
              ></Icon>
              <Icon
                v-else="!darkMode"
                name="ic:outline-dark-mode"
                size="22"
              ></Icon>
            </UIIconbutton>
            <NuxtLink
              v-if="!user"
              :class="defaultTransition"
              to="/login"
              class="text-white bg-[#423ed8] hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
              >Log in</NuxtLink
            >
            <div v-else class="flex items-center">
              <NuxtLink
                to="/user"
                class="text-primary-200 dark:text-white mr-4"
              >
                <div class="flex items-center">
                  <img
                    :src="user.user_metadata.picture"
                    alt="user.user_metadata.name"
                    class="w-8 h-8 rounded-full"
                  />
                  <span class="ml-2 text-sm leading-4 hidden sm:block">{{
                    user.user_metadata.name
                  }}</span>
                </div>
              </NuxtLink>
              <button
                @click.prevent="logout"
                class="text-white bg-[#423ed8] hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800 whitespace-nowrap"
                :class="defaultTransition"
              >
                Sign Out
              </button>
            </div>
          </div>
          <div
            class="absolute top-[100%] left-0 justify-between items-center w-full lg:flex lg:w-auto lg:order-1 bg-white dark:bg-primary-800 pb-4 px-4 z-50"
            id="mobile-menu-2"
            v-if="menuexpanded"
            @click="toggleMenu"
          >
            <ul class="-mx-4 pt-4">
              <li class="px-4 mb-4">
                <UIButton class="rounded">
                  <NuxtLink to="/user/add/">Create course</NuxtLink>
                </UIButton>
              </li>
              <li class="px-4 mb-4">
                <NuxtLink
                  class="text-primary-900 dark:text-white"
                  to="/user/courses/"
                  >Courses</NuxtLink
                >
              </li>
              <li class="px-4 mb-2">
                <NuxtLink
                  class="text-primary-900 dark:text-white"
                  to="/user/tags/"
                  >Tags</NuxtLink
                >
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useMainStore } from "@/stores/mainstore"

const { defaultTransition } = useTailwindConfig()
const menuexpanded = ref(false)

const dropdown = ref(null)

const client = useSupabaseClient()
const user = useSupabaseUser()

const mainStore = useMainStore()

const changeMode = () => {
  mainStore.changeMode()
}

const darkMode = computed(() => mainStore.getMode)

const logout = async () => {
  const { error } = await client.auth.signOut()
  navigateTo("/login")
}

const toggleMenu = () => {
  menuexpanded.value = !menuexpanded.value
}
</script>

<style scoped></style>
